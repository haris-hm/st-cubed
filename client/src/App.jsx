import { DiscordSDKContext, useDiscordSDK } from "./hooks/useDiscordSDK";
import { Router } from "./pages/Router";

import "./styles/input.css";

function App() {
	const discordSDK = useDiscordSDK();

	return (
		<DiscordSDKContext.Provider value={discordSDK}>
			<Router />
		</DiscordSDKContext.Provider>
	);
}

export default App;
