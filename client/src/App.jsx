import DiscordProvider from "./context/DiscordProvider";
import SocketProvider from "./context/SocketProvider";
import { Router } from "./pages/Router";

import { useDiscordSDK } from "./hooks/useDiscordSDK";

import "./styles/input.css";

function App() {
	const discordSDK = useDiscordSDK();

	return (
		<SocketProvider>
			<DiscordProvider value={discordSDK}>
				<Router />
			</DiscordProvider>
		</SocketProvider>
	);
}

export default App;
