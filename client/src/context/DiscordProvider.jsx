import { createContext } from "react";

export const DiscordSDKContext = createContext(null);

function DiscordProvider({ value, children }) {
	return (
		<DiscordSDKContext.Provider value={value}>
			{children}
		</DiscordSDKContext.Provider>
	);
}

export default DiscordProvider;
