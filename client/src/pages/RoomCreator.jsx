import { useContext, useState } from "react";

import Background from "../components/Background";
import { SelectorOption, SelectorButton } from "../components/SelectorButton";
import Modal from "../components/Modal";
import Button from "../components/Button";

import { DiscordSDKContext } from "../hooks/useDiscordSDK";

function RoomCreator() {
	const [selectedGameMode, setSelectedGameMode] = useState(null);
	const [selectedTimeLimit, setSelectedTimeLimit] = useState(null);
	const { discordSDK, auth } = useContext(DiscordSDKContext);

	const gameModeOptions = [
		new SelectorOption("Classic", "Tic-Tac-Toe-Ception", true),
		new SelectorOption("Campaign", "Coming soon", false),
		new SelectorOption("Speedrun", "Coming soon", false),
	];

	const timeLimitOptions = [
		new SelectorOption("1 min", "", true),
		new SelectorOption("3 min", "", true),
		new SelectorOption("5 min", "", true),
		new SelectorOption("Unlimited", "", true),
	];

	function handleSelectGameMode(selectedOption) {
		console.log("Selected game mode:", selectedOption);
	}

	function handleSelectTimeLimit(selectedOption) {
		console.log("Selected game mode:", selectedOption);
	}

	return (
		<Background>
			<div className="font-noto-sans text-primary flex min-h-screen items-center justify-center">
				<Modal>
					<h1 className="pb-3 text-4xl font-bold">
						Lets get started...
					</h1>
					<p className="pb-2 text-2xl">Game Mode:</p>
					<SelectorButton
						color={"tertiary"}
						options={gameModeOptions}
						defaultOptionIdx={0}
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
						onClick={() => {}}
						color={"primary"}
					></Button>
				</Modal>
			</div>
		</Background>
	);
}

export default RoomCreator;
