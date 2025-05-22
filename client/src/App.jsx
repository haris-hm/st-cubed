import { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import RoomCreator from "./pages/RoomCreator";
import RoomJoiner from "./pages/RoomJoiner";
import GameRoom from "./pages/GameRoom";

import { useDiscordSDK } from "./hooks/useDiscordSDK";

import "./styles/input.css";

function App() {
	const { discordSdk, auth } = useDiscordSDK();
	console.log("Discord SDK:", discordSdk);
	console.log("Auth:", auth);

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/game/create" element={<RoomCreator />} />
				<Route path="/game/join" element={<RoomJoiner />} />
				<Route path="/game/:roomId" element={<GameRoom />} />
				<Route path="*" element={<Navigate to="/" replace />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
