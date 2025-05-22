import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "../components/Button";

import { DiscordSDKContext } from "../hooks/useDiscordSDK";

function Home() {
	const navigate = useNavigate();
	const { discordSDK, auth } = useContext(DiscordSDKContext);

	const handleCreateRoom = () => {
		navigate("/game/create");
	};

	const handleJoinRoom = () => {
		navigate("/game/join");
	};

	return (
		<div className="bg-light text-primary grid min-h-screen bg-cover max-md:bg-[url(/.proxy/background/peaks-mobile-light.svg)] md:bg-[url(/.proxy/background/peaks-desktop-light.svg)]">
			<div className="flex flex-col items-center justify-center">
				<img
					src="/.proxy/logos/full-st3-alt.svg"
					alt="Super Tic-Tac-Toe"
					className="max-w-4/10 drop-shadow-dark drop-shadow-xl max-md:hidden"
				/>
				<img
					src="/.proxy/logos/full-st3-alt-mobile.svg"
					alt="Super Tic-Tac-Toe"
					className="max-w-6/10 drop-shadow-dark drop-shadow-xl md:hidden"
				/>

				<div className="min-w-1/2 drop-shadow-dark max-md:min-w-8/10 text-light font-noto-sans my-12 flex select-none flex-row items-center justify-center text-3xl font-bold drop-shadow-lg max-md:flex-col">
					<Button
						color="primary"
						onClick={handleCreateRoom}
						text="Create Room"
					/>
					<Button
						color="secondary"
						onClick={handleJoinRoom}
						text="Join Room"
					/>
				</div>
			</div>
		</div>
	);
}

export default Home;
