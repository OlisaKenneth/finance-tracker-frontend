import { useState, useEffect, useCallback } from "react";
import { usePlaidLink } from "react-plaid-link";
import apiClient from "../api/apiClient";

/*
 * ConnectBank — THE "Connect my bank" BUTTON
 *
 * This component's job, in plain steps:
 *
 * 1. As soon as this component loads, ask OUR OWN backend
 *    for a link_token (the empty "ready to go" ticket)
 *
 * 2. Once we have that token, hand it to Plaid's own
 *    ready-made popup component (usePlaidLink) — we don't
 *    build the popup ourselves, Plaid already did
 *
 * 3. When the user finishes "logging into" the fake bank
 *    inside that popup, Plaid gives us back a public_token
 *
 * 4. We send that public_token to our backend to trade for
 *    a permanent access_token and save it
 *
 * 5. NEW: immediately after the bank connects, we call
 *    sync-transactions automatically so the user's bank
 *    transactions appear right away — no manual step needed
 */
function ConnectBank({ onSyncComplete }) {
    // onSyncComplete — a function passed in from Dashboard
    // that we call after syncing so the dashboard refreshes
    // its transaction count automatically

    const [linkToken, setLinkToken] = useState(null);

    // Step 1: ask our backend for a link_token the moment
    // this component appears on screen
    useEffect(() => {
        async function fetchLinkToken() {
            try {
                const data = await apiClient("/api/plaid/link-token", {
                    method: "POST",
                });
                setLinkToken(data.linkToken);
            } catch (error) {
                console.error("Error fetching link token:", error);
            }
        }
        fetchLinkToken();
    }, []);

    // Step 3: this function runs automatically WHEN the user
    // successfully finishes the Plaid popup flow
    const onSuccess = useCallback(async (publicToken) => {
        console.log("Plaid public_token received:", publicToken);

        try {
            // Step 4: send the temporary ticket to our backend
            // to trade it for a permanent access_token and save it
            await apiClient("/api/plaid/exchange-token", {
                method: "POST",
                body: JSON.stringify({ publicToken }),
            });
            console.log("Bank connected successfully!");

            // Step 5: NEW — immediately pull transactions from
            // Plaid and save them to our database automatically
            // the user never has to do this manually
            const syncedTransactions = await apiClient(
                "/api/plaid/sync-transactions",
                { method: "POST" }
            );
            console.log(
                "Transactions synced automatically:",
                syncedTransactions
            );

            // Step 6: tell the Dashboard to refresh so the
            // new transaction count appears immediately
            // onSyncComplete is optional — only runs if Dashboard passed it in
            if (onSyncComplete) {
                onSyncComplete();
            }
        } catch (error) {
            console.error("Error connecting bank or syncing:", error);
        }
    }, [onSyncComplete]);
    // onSyncComplete added to the dependency array because
    // we use it inside the callback — React requires this

    // Step 2: usePlaidLink is Plaid's own ready-made hook —
    // it builds the popup for us. We just hand it our token
    // and tell it what to do when it succeeds.
    const { open, ready } = usePlaidLink({
        token: linkToken,
        onSuccess,
    });

    return (
        <button
            className="connect-bank-btn"
            onClick={() => open()}
            disabled={!ready}
        >
            {ready ? "Connect my bank" : "Loading..."}
        </button>
    );
}

export default ConnectBank;