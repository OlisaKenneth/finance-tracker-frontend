// apiClient.js
//
// THE FRONT DESK for every request this app makes to the backend.
//
// Instead of every hook (useBudgets, useTransactions, useSavingsGoal)
// writing its own fetch(), attaching its own token, and handling its
// own errors — they all go through this ONE function.
//
// Why centralize it?
// - Attach the token in exactly one place, not five
// - If the token expires, handle it in exactly one place
//   (log the user out + send them to login), not five
// - If you change how errors are handled later, you change it here,
//   not in every single hook

const BASE_URL = "https://finance-tracker-production-1547.up.railway.app";

async function apiClient(path, options = {}) {
    const token = localStorage.getItem("token");

    const headers = {
        ...(options.body ? { "Content-Type": "application/json" } : {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
    };

    const response = await fetch(`${BASE_URL}${path}`, {
        ...options,
        headers,
    });

    // Token missing, expired, or invalid — the server refused us.
    // Clear the dead token and send the user back to login instead
    // of leaving them staring at a broken dashboard.
    if (response.status === 401 || response.status === 403) {
        localStorage.removeItem("token");
        window.location.href = "/";
        // Throwing stops the calling hook from trying to read a body
        // that isn't coming (we're already redirecting away).
        throw new Error("Session expired. Please log in again.");
    }

    if (!response.ok) {
        // Any other failure (404, 500, etc.) — let the calling code
        // decide how to show this to the user.
        const message = await response.text().catch(() => "Request failed");
        throw new Error(message || `Request failed with status ${response.status}`);
    }

    // DELETE requests often return no body — guard against parsing
    // an empty response as JSON, which would throw.
    const text = await response.text();
    return text ? JSON.parse(text) : null;
}

export default apiClient;