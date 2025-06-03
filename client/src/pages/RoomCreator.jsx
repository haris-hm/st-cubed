import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
	BackButton,
	Background,
	Button,
	Modal,
	SelectorButton,
	SelectorOption,
} from "../components/ui";

import { DiscordSDKContext } from "../context/Context";

import { createRoom } from "../util/socket/emit";
import { getUserId, getUsername } from "../util/discord/getUserInfo";

/**
 * Renders a page component which allows the user to create a game room. The
 * user can select a game mode and a time limit before starting the game.
 *
 * @returns {JSX.Element} The RoomCreator page component.
 */
function RoomCreator() {
	const [selectedGameModeIdx, setSelectedGameModeIdx] = useState(0);
	const [selectedTimeLimitIdx, setSelectedTimeLimitIdx] = useState(0);
	const navigate = useNavigate();
	const { auth } = useContext(DiscordSDKContext);

	// Define the game modes and time limits as options for the selector buttons
	const gameModeOptions = [
		new SelectorOption("Classic", "Tic-Tac-Toe-Ception", true, 0),
		new SelectorOption("Campaign", "Coming soon", false, 1),
		new SelectorOption("Speedrun", "Coming soon", false, 2),
		new SelectorOption("Basic", "Coming soon", false, 3), // TODO: Set description to "Timeless classic" when implemented
	];

	const timeLimitOptions = [
		new SelectorOption("Unlimited", "Low stakes", true, "unlimited"),
		new SelectorOption("3 min", "Easy", true, 60 * 3),
		new SelectorOption("1 min", "Medium", true, 60),
		new SelectorOption("30 sec", "Hard", true, 30),
	];

	// Handlers for the selector buttons to update the selected indices
	function handleSelectGameMode(selectedOption) {
		setSelectedGameModeIdx(selectedOption);
	}

	function handleSelectTimeLimit(selectedOption) {
		setSelectedTimeLimitIdx(selectedOption);
	}

	/**
	 * Handles the play button click event. It checks if the selected game mode
	 * and time limit are enabled, and if so, it creates a room with the selected
	 * options and navigates to the game page. If not enabled, an error message is
	 * displayed to the user.
	 */
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
			<div className="font-noto-sans text-primary flex h-full items-center justify-center">
				<Modal>
					<div className="min-w-1/1 mb-2 flex flex-row items-center justify-start max-md:justify-center">
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
						className="min-h-20 w-full max-md:mx-0 max-md:my-3 md:mx-3"
					></Button>
				</Modal>
			</div>
		</Background>
	);
}

export default RoomCreator;
