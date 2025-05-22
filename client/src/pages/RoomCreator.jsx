import { useContext, useEffect } from "react";

import { DiscordSDKContext } from "../hooks/useDiscordSDK";

function RoomCreator() {
	const { discordSDK, auth } = useContext(DiscordSDKContext);
	console.log(discordSDK);

	return (
		<div>
			<h1>RoomCreator</h1>
			<p>Welcome to the RoomCreator page!</p>
			<p>This is a simple React application.</p>
		</div>
	);
}

export default RoomCreator;
