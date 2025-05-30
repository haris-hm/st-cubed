import { useEffect, useRef } from "react";

import { registerUser } from "../util/socket/emit";
import {
	getGlobalName,
	getUserAvatarHash,
	getUserId,
	getUsername,
} from "../util/discord/getUserInfo";
import { DiscordSDKContext } from "./Context";

/**
 * DiscordProvider component to provide Discord SDK and auth context
 *
 * @param {Object} params - The parameters for the DiscordProvider component.
 * @param {Object} params.discordInfo - The Discord information object containing the auth object.
 * @param {React.ReactNode} params.children - The children components to be rendered within the provider.
 *
 * @returns {JSX.Element} - The DiscordProvider component that provides the Discord SDK context to its children.
 */
function DiscordProvider({ discordInfo, children }) {
	const hasRun = useRef(false);

	useEffect(() => {
		// Prevent multiple registrations
		if (hasRun.current) return;

		const auth = discordInfo?.auth;
		const userId = getUserId(auth);
		const username = getUsername(auth);
		const displayName = getGlobalName(auth);
		const avatarHash = getUserAvatarHash(auth);

		if (userId && username && displayName && avatarHash) {
			registerUser(userId, username, displayName, avatarHash);
			hasRun.current = true;
		}
	}, [discordInfo]);

	return (
		<DiscordSDKContext.Provider value={discordInfo}>
			{children}
		</DiscordSDKContext.Provider>
	);
}

export default DiscordProvider;
