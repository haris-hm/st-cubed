import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../components/ui/Button";
import Background from "../components/ui/Background";

import { DiscordSDKContext } from "../context/DiscordProvider";
import { setActivity } from "../util/discord/setActivity";

function Home() {
	const navigate = useNavigate();
	const { discordSDK, auth } = useContext(DiscordSDKContext);

	useEffect(() => {
		setActivity(discordSDK, { state: "In menu" });
	}, [discordSDK]);

	const handleCreateRoom = () => {
		navigate("/game/create");
	};

	const handleJoinRoom = () => {
		navigate("/game/join");
	};

	return (
		<Background>
			<div className="grid min-h-screen">
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

					<div className="min-w-1/2 drop-shadow-dark max-md:min-w-8/10 my-12 flex flex-row items-center justify-center drop-shadow-lg max-md:flex-col">
						<div className="min-w-1/2 max-md:min-w-1/1 px-2">
							<Button
								color="primary"
								onClick={handleCreateRoom}
								text="Create Room"
							/>
						</div>
						<div className="min-w-1/2 max-md:min-w-1/1 px-2">
							<Button
								color="secondary"
								onClick={handleJoinRoom}
								text="Join Room"
							/>
						</div>
					</div>
				</div>
			</div>
		</Background>
	);
}

export default Home;
