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
import { getUserId, getUsername } from "../util/discord/getUserInfo";

function RoomCreator() {
	const [selectedGameModeIdx, setSelectedGameModeIdx] = useState(0);
	const [selectedTimeLimitIdx, setSelectedTimeLimitIdx] = useState(0);
	const navigate = useNavigate();
	const { auth } = useContext(DiscordSDKContext);

	const gameModeOptions = [
		new SelectorOption("Classic", "Tic-Tac-Toe-Ception", true, 0),
		new SelectorOption("Campaign", "Coming soon", false, 1),
		new SelectorOption("Speedrun", "Coming soon", false, 2),
		new SelectorOption("Basic", "Coming soon", false, 3), // Set description to "Timeless classic" when implemented
	];

	const timeLimitOptions = [
		new SelectorOption("Unlimited", "Low stakes", true, "unlimited"),
		new SelectorOption("3 min", "Easy", true, 60 * 3),
		new SelectorOption("1 min", "Medium", true, 60),
		new SelectorOption("30 sec", "Hard", true, 30),
	];

	function handleSelectGameMode(selectedOption) {
		setSelectedGameModeIdx(selectedOption);
	}

	function handleSelectTimeLimit(selectedOption) {
		setSelectedTimeLimitIdx(selectedOption);
	}

	function handlePlay() {
		const selectedGameMode = gameModeOptions[selectedGameModeIdx];
		const selectedTimeLimit = timeLimitOptions[selectedTimeLimitIdx];

		if (selectedGameMode.isEnabled() && selectedTimeLimit.isEnabled()) {
			createRoom(
				{
					gameMode: selectedGameMode.getValue(),
					timeLimit: selectedTimeLimit.getValue(),
					discordId: getUserId(auth),
					username: getUsername(auth),
				},
				(roomId) => {
					navigate(`/game/${roomId}`);
				},
			);
		}
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
						currentOptionIdx={selectedGameModeIdx}
						onChange={handleSelectGameMode}
					></SelectorButton>
					<p className="py-2 text-2xl">Time Limit:</p>
					<SelectorButton
						color={"secondary"}
						options={timeLimitOptions}
						currentOptionIdx={selectedTimeLimitIdx}
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
