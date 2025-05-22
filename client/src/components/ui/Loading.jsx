import { useState, useEffect } from "react";

import Background from "./Background";
import Modal from "./Modal";

function Loading() {
	const [dots, setDots] = useState(1);
	const [randomMessage, setRandomMessage] = useState("");
	//TODO: Add more funny splash texts
	const splashTexts = [
		"Loading",
		"Please wait",
		"Almost there",
		"Playing fetch",
		"Preparing your experience",
		"Setting things up",
		"Hang tight",
		"Just a moment",
		"Loading your content",
		"Loading resources",
		"Loading assets",
		"Setting up a Minecraft server",
		"Loading the universe",
		"Loading the multiverse",
		"Deleting Herobrine",
		"Cleaning things up",
		"Reticulating splines",
		"Refactoring code",
		"Compiling code",
		"Screaming at the computer",
	];

	useEffect(() => {
		setRandomMessage(
			splashTexts[Math.floor(Math.random() * splashTexts.length)],
		);

		const interval = setInterval(() => {
			setDots((prev) => (prev < 3 ? prev + 1 : 1));
		}, 500);

		return () => clearInterval(interval);
	}, []);

	return (
		<Background>
			<div className="flex min-h-screen items-center justify-center">
				<Modal>
					<span className="invisible">
						<p className="text-dark mt-4 text-2xl">
							{randomMessage}
							{"..."}
						</p>
					</span>
					<div className="border-primary border-r-6 border-t-6 h-16 w-16 animate-spin rounded-full border-solid"></div>
					<p className="text-dark mt-4 text-2xl">
						{randomMessage}
						{".".repeat(dots)}
					</p>
				</Modal>
			</div>
		</Background>
	);
}

export default Loading;
