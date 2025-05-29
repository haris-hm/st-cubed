import { useEffect } from "react";

import { registerUser } from "../util/socket/emit";
import {
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
	useEffect(() => {
		const userId = getUserId(discordInfo.auth);
		const username = getUsername(discordInfo.auth);
		const avatarHash = getUserAvatarHash(discordInfo.auth);

		if (userId && username && avatarHash) {
			registerUser(userId, username, avatarHash);
		}
	}, [discordInfo]);

	return (
		<DiscordSDKContext.Provider value={discordInfo}>
			{children}
		</DiscordSDKContext.Provider>
	);
}

export default DiscordProvider;
