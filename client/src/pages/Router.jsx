import { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { GameRoom, Home, RoomCreator, RoomJoiner } from "./";
import { Loading } from "../components/ui";

import { DiscordSDKContext } from "../context/Context";

/**
 * Utilizes React Router to define the main application routes.
 *
 * @returns {JSX.Element} The main router component that handles navigation between pages.
 */
function Router() {
	const { fetching } = useContext(DiscordSDKContext);

	/*
	 * Show a loading state until the discord SDK context is ready
	 * This is necessary to ensure that the Discord SDK is fully initialized
	 * as several components depend on it for rendering.
	 */
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

export default Router;
