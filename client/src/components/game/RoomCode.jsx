import { useRef, useEffect } from "react";

import { Background, Modal, ShareLinkButton } from "../ui";
import { capitalizeFirstLetters } from "../../util/game/roomCode";

/**
 * Displays the room code to the user so they can share it with a friend.
 * Provides a {@link ShareLinkButton} to share the room code to a Discord channel
 * or DM. When the game start countdown starts, it switches to displaying the
 * value of the countdown.
 *
 * @param {Object} props - The props for the RoomCode component.
 * @param {string} props.roomId - The ID of the room.
 * @param {number} props.countdown - The current value of the countdown timer in seconds.
 *
 * @returns {JSX.Element} - The rendered RoomCode component.
 */
function RoomCode({ roomId, countdown }) {
	const shareRef = useRef(null);
	const countdownRef = useRef(null);

	/* Toggles visibility of the countdown and the room code, depending on
	 * the state of the countdown */
	useEffect(() => {
		if (countdown) {
			shareRef.current.classList.add("hidden");
			countdownRef.current.classList.remove("hidden");
		} else {
			shareRef.current.classList.remove("hidden");
			countdownRef.current.classList.add("hidden");
		}
	}, [countdown]);

	return (
		<Background>
			<div className="font-noto-sans text-primary min-w-screen flex min-h-screen select-none flex-col items-center justify-center">
				<div className="max-md:max-w-8/10 flex flex-col items-center justify-center">
					<Modal>
						<div ref={shareRef}>
							<h1 className="mb-3 text-5xl font-semibold max-md:text-3xl">
								Waiting for a friend...
							</h1>
							<h2 className="text-active-text text-2xl font-medium max-md:text-lg">
								Share the following code and have your friend
								join!
							</h2>
							<div className="flex flex-row items-center justify-center max-md:flex-col">
								<h1 className="mt-5 text-5xl font-black max-md:text-3xl">
									{capitalizeFirstLetters(roomId)}
								</h1>
								<div className="mt-7 max-md:mt-5 md:ml-4">
									<ShareLinkButton
										message={`Come play Super Tic-Tac-Toe with me!\n\nJoin Code: ${capitalizeFirstLetters(roomId)}`}
									/>
								</div>
							</div>
						</div>
						<div ref={countdownRef}>
							<h1 className="mb-3 text-5xl font-semibold max-md:text-3xl">
								Second player joined!
							</h1>
							<h2 className="text-active-text text-2xl font-medium max-md:text-lg">
								Starting in {countdown} seconds...
							</h2>
						</div>
					</Modal>
				</div>
			</div>
		</Background>
	);
}

export default RoomCode;
