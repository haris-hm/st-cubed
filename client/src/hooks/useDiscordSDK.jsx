import { useEffect, useState, useRef } from "react";
import { DiscordSDK } from "@discord/embedded-app-sdk";

/**
 * @typedef {Object} DiscordInfo
 * @property {DiscordSDK | null} discordSDK - The Discord SDK instance.
 * @property {Object | null} auth The authentication details.
 * @property {boolean} fetching Indicates whether the SDK is still being fetched.
 */

/**
 * Custom hook to initialize the Discord SDK and authenticate the user.
 *
 * @returns {DiscordInfo} An object containing the Discord SDK instance, authentication details, and a fetching state.
 */
function useDiscordSDK() {
	const [discordSDK, setDiscordSDK] = useState(null);
	const [auth, setAuth] = useState(null);
	const [fetching, setFetching] = useState(true);
	const hasRun = useRef(false);

	useEffect(() => {
		// Prevent multiple initializations
		if (hasRun.current) return;
		hasRun.current = true;

		const sdk = new DiscordSDK(import.meta.env.VITE_DISCORD_CLIENT_ID);

		async function setup() {
			await sdk.ready();

			// Authorize with Discord Client
			const { code } = await sdk.commands.authorize({
				client_id: import.meta.env.VITE_DISCORD_CLIENT_ID,
				response_type: "code",
				state: "",
				prompt: "none",
				scope: [
					"identify",
					"guilds",
					"applications.commands",
					"rpc.activities.write",
				],
			});

			console.log("Authorization code:", code);

			// Retrieve an access_token from your activity's server
			// Note: We need to prefix our backend `/api/token` route with `/.proxy` to stay compliant with the CSP.
			// Read more about constructing a full URL and using external resources at
			// https://discord.com/developers/docs/activities/development-guides/networking#construct-a-full-url
			const response = await fetch("/.proxy/api/token", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					code,
				}),
			});
			const { access_token } = await response.json();

			// Authenticate with Discord client (using the access_token)
			let authResult = await sdk.commands.authenticate({
				access_token,
			});

			if (authResult == null) {
				throw new Error("Authenticate command failed");
			}

			setDiscordSDK(sdk);
			setAuth(authResult);
			setFetching(false);
		}

		setup();
	}, []);

	return { discordSDK, auth, fetching };
}

export { useDiscordSDK };
