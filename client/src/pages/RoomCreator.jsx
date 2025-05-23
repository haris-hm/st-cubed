import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import Background from "../components/ui/Background";
import {
	SelectorOption,
	SelectorButton,
} from "../components/ui/SelectorButton";
import BackButton from "../components/ui/BackButton";
import Modal from "../components/ui/Modal";
import Button from "../components/ui/Button";

import { DiscordSDKContext } from "../context/DiscordProvider";

import { createRoom } from "../util/socket/emit";

function RoomCreator() {
	const [selectedGameMode, setSelectedGameMode] = useState(null);
	const [selectedTimeLimit, setSelectedTimeLimit] = useState(null);
	const { discordSDK, auth } = useContext(DiscordSDKContext);
	const navigate = useNavigate();

	const gameModeOptions = [
		new SelectorOption("Basic", "Timeless Classic", false, 0),
		new SelectorOption("Classic", "Tic-Tac-Toe-Ception", true, 1),
		new SelectorOption("Campaign", "Coming soon", false, 2),
		new SelectorOption("Speedrun", "Coming soon", false, 3),
	];

	const timeLimitOptions = [
		new SelectorOption("Unlimited", "Low stakes", true, Infinity),
		new SelectorOption("3 min", "Easy", true, 60 * 3),
		new SelectorOption("1 min", "Medium", true, 60),
		new SelectorOption("30 sec", "Hard", true, 30),
	];

	function handleSelectGameMode(selectedOption) {
		setSelectedGameMode(selectedOption);
	}

	function handleSelectTimeLimit(selectedOption) {
		setSelectedTimeLimit(selectedOption);
	}

	function handlePlay() {
		createRoom((roomId) => {
			console.log("Room created with ID:", roomId);
			navigate(`/game/${roomId}`);
		});
	}

	return (
		<Background>
			<div className="font-noto-sans text-primary flex min-h-screen items-center justify-center">
				<Modal>
					<div className="min-w-1/1 mb-2 flex flex-row items-center justify-start">
						<BackButton />
					</div>
					<h1 className="pb-3 text-4xl font-bold">
						Lets get started...
					</h1>
					<p className="pb-2 text-2xl">Game Mode:</p>
					<SelectorButton
						color={"tertiary"}
						options={gameModeOptions}
						defaultOptionIdx={1}
						onChange={handleSelectGameMode}
					></SelectorButton>
					<p className="py-2 text-2xl">Time Limit:</p>
					<SelectorButton
						color={"secondary"}
						options={timeLimitOptions}
						defaultOptionIdx={0}
						onChange={handleSelectTimeLimit}
					></SelectorButton>
					<span className="py-4"></span>
					<Button
						text={"Play"}
						color={"primary"}
						onClick={handlePlay}
					></Button>
				</Modal>
			</div>
		</Background>
	);
}

export default RoomCreator;
