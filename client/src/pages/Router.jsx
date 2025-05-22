import { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./Home";
import RoomCreator from "./RoomCreator";
import RoomJoiner from "./RoomJoiner";
import GameRoom from "./GameRoom";
import Loading from "../components/Loading";

import { DiscordSDKContext } from "../context/DiscordProvider";

export function Router() {
	const { fetching } = useContext(DiscordSDKContext);

	// Show a loading state until both are ready
	if (fetching) {
		return <Loading />;
	}

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
