import { useState } from "react";

const API_BASE = "https://finance-tracker-production-1547.up.railway.app";

export default function Auth({ onLogin }) {
    const [mode, setMode] = useState("login"); // "login" or "register"
    const [form, setForm] = useState({ name: "", email: "", password: "", role: "USER" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError("");
    };

    const handleSubmit = async () => {
        setLoading(true);
        setError("");

        const endpoint = mode === "login" ? "/api/auth/login" : "/api/auth/register";

        const body =
            mode === "login"
                ? { email: form.email, password: form.password }
                : { name: form.name, email: form.email, password: form.password, role: form.role };

        try {
            const res = await fetch(`${API_BASE}${endpoint}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error || data.errors?.join(", ") || "Something went wrong");
                return;
            }

            if (mode === "login") {
                // login returns the token directly as a string
                localStorage.setItem("token", data);
                onLogin();
            } else {
                // register succeeded — switch to login
                setMode("login");
                setForm({ name: "", email: form.email, password: "", role: "USER" });
                setError("");
            }
        } catch {
            setError("Could not connect to server");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-card">
                {/* Logo */}
                <div className="auth-logo">
                    <div className="auth-logo-mark">FT</div>
                    <span className="auth-logo-name">Finance Tracker</span>
                </div>

                {/* Heading */}
                <div className="auth-heading">
                    <h1>{mode === "login" ? "Welcome back" : "Create your account"}</h1>
                    <p>
                        {mode === "login"
                            ? "Track your money. Own your future."
                            : "Start taking control of your finances today."}
                    </p>
                </div>

                {/* Tab toggle */}
                <div className="auth-tabs">
                    <button
                        className={`auth-tab ${mode === "login" ? "active" : ""}`}
                        onClick={() => { setMode("login"); setError(""); }}
                    >
                        Sign in
                    </button>
                    <button
                        className={`auth-tab ${mode === "register" ? "active" : ""}`}
                        onClick={() => { setMode("register"); setError(""); }}
                    >
                        Create account
                    </button>
                </div>

                {/* Form */}
                <div className="auth-form">
                    {mode === "register" && (
                        <div className="auth-field">
                            <label className="auth-label">Full name</label>
                            <input
                                className="auth-input"
                                type="text"
                                name="name"
                                placeholder="Kenneth Olisa"
                                value={form.name}
                                onChange={handleChange}
                            />
                        </div>
                    )}

                    <div className="auth-field">
                        <label className="auth-label">Email address</label>
                        <input
                            className="auth-input"
                            type="email"
                            name="email"
                            placeholder="you@example.com"
                            value={form.email}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="auth-field">
                        <label className="auth-label">Password</label>
                        <input
                            className="auth-input"
                            type="password"
                            name="password"
                            placeholder={mode === "register" ? "At least 8 characters" : "Enter your password"}
                            value={form.password}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Error message */}
                    {error && <div className="auth-error">{error}</div>}

                    {/* Submit */}
                    <button
                        className="auth-submit"
                        onClick={handleSubmit}
                        disabled={loading}
                    >
                        {loading
                            ? "Please wait..."
                            : mode === "login"
                                ? "Sign in"
                                : "Create account"}
                    </button>
                </div>

                {/* Footer switch */}
                <p className="auth-switch">
                    {mode === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
                    <button
                        className="auth-switch-btn"
                        onClick={() => { setMode(mode === "login" ? "register" : "login"); setError(""); }}
                    >
                        {mode === "login" ? "Create one" : "Sign in"}
                    </button>
                </p>
            </div>

            {/* Right panel — decorative */}
            <div className="auth-panel">
                <div className="auth-panel-content">
                    <div className="auth-panel-stat">
                        <span className="auth-panel-number">$0</span>
                        <span className="auth-panel-label">wasted on confusion</span>
                    </div>
                    <div className="auth-panel-divider" />
                    <blockquote className="auth-panel-quote">
                        "A budget is telling your money where to go instead of wondering where it went."
                    </blockquote>
                    <cite className="auth-panel-cite">— Dave Ramsey</cite>

                    <div className="auth-panel-features">
                        <div className="auth-panel-feature">
                            <span className="auth-panel-dot" />
                            Track budgets by category
                        </div>
                        <div className="auth-panel-feature">
                            <span className="auth-panel-dot" />
                            Log transactions in seconds
                        </div>
                        <div className="auth-panel-feature">
                            <span className="auth-panel-dot" />
                            Watch your savings grow
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}