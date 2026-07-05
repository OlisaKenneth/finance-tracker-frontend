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
 * 4. For now, we just log that public_token to the console
 *    so we can SEE it worked — the next step (sending it to
 *    our backend to trade for a permanent key) comes after
 */
function ConnectBank() {
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
    const onSuccess = useCallback((publicToken, metadata) => {
        console.log("Plaid public_token received:", publicToken);
        console.log("Plaid metadata:", metadata);
        // Next step (coming soon): send publicToken to our
        // own backend to trade it for a permanent access_token
    }, []);

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