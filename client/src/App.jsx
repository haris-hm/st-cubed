import DiscordProvider from "./context/DiscordProvider";
import SocketProvider from "./context/SocketProvider";
import { Router } from "./pages/Router";

import { useDiscordSDK } from "./hooks/useDiscordSDK";

/**
 * Main application component that sets up the context providers for Discord and Socket
 * and wraps the entire application within them.
 *
 * @returns {JSX.Element}
 */
function App() {
	const discordInfo = useDiscordSDK();

	return (
		<SocketProvider>
			<DiscordProvider discordInfo={discordInfo}>
				<Router />
			</DiscordProvider>
		</SocketProvider>
	);
}

export default App;
