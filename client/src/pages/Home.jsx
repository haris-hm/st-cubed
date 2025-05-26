import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../components/ui/Button";
import Background from "../components/ui/Background";
import ProfilePicture from "../components/ui/ProfilePicture";

import { DiscordSDKContext } from "../context/Context";
import { setActivity } from "../util/discord/setActivity";

/**
 * Renders a Home page component, rendering the logo and buttons which
 * allow the user to create a game room or join an existing game. Buttons
 * navigate the user to their respective pages.
 *
 * @returns {JSX.Element} The Home page component.
 */
function Home() {
	const navigate = useNavigate();
	const { discordSDK } = useContext(DiscordSDKContext);

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
			<ProfilePicture />
			<div className="grid min-h-screen">
				<div className="flex flex-col items-center justify-center">
					<img
						src="/.proxy/logos/full-st3-alt.svg"
						alt="Super Tic-Tac-Toe"
						className="max-w-4/10 drop-shadow-dark select-none drop-shadow-xl max-md:hidden"
						draggable="false"
					/>
					<img
						src="/.proxy/logos/full-st3-alt-mobile.svg"
						alt="Super Tic-Tac-Toe"
						className="max-w-6/10 drop-shadow-dark select-none drop-shadow-xl md:hidden"
						draggable="false"
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
