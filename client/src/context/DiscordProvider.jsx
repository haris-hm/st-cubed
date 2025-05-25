import { createContext, useEffect } from "react";

import { registerUser } from "../util/socket/emit";
import { getUserId, getUsername } from "../util/discord/getUserInfo";

export const DiscordSDKContext = createContext(null);

function DiscordProvider({ value, children }) {
	useEffect(() => {
		const userId = getUserId(value.auth);
		const username = getUsername(value.auth);

		if (userId && username) {
			registerUser(userId, username);
		}
	}, [value]);

	return (
		<DiscordSDKContext.Provider value={value}>
			{children}
		</DiscordSDKContext.Provider>
	);
}

export default DiscordProvider;
