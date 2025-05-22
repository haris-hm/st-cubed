import { useEffect, useState, createContext } from "react";
import { DiscordSDK } from "@discord/embedded-app-sdk";

export function useDiscordSDK() {
	const [discordSDK, setDiscordSDK] = useState(null);
	const [auth, setAuth] = useState(null);
	const [fetching, setFetching] = useState(true);

	useEffect(() => {
		const sdk = new DiscordSDK(import.meta.env.VITE_DISCORD_CLIENT_ID);

		async function setup() {
			await sdk.ready();

			// Authorize with Discord Client
			const { code } = await sdk.commands.authorize({
				client_id: import.meta.env.VITE_DISCORD_CLIENT_ID,
				response_type: "code",
				state: "",
				prompt: "none",
				scope: ["identify", "guilds", "applications.commands"],
			});

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
