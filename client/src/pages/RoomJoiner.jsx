import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { BackButton, Background, Button, Input, Modal } from "../components/ui";

import { joinRoom, validateRoomID } from "../util/socket/emit";

/**
 * Renders a page component that allows users to join a room by entering a room code.
 *
 * @returns {JSX.Element} The RoomJoiner page component.
 */
function RoomJoiner() {
	const [roomCode, setRoomCode] = useState(Array(3).fill(""));
	const [validCode, setValidCode] = useState(null);
	const navigate = useNavigate();
	const firstInputRef = useRef(null);
	const secondInputRef = useRef(null);
	const thirdInputRef = useRef(null);
	const errorMessageRef = useRef(null);

	const inputRefs = [firstInputRef, secondInputRef, thirdInputRef];

	useEffect(() => {
		// Focus on the first input when the component mounts
		firstInputRef?.current?.focus();

		// Display an error message if the room code is invalid
		if (!validCode && validCode !== null) {
			errorMessageRef?.current?.classList.remove("hidden");
		} else if (validCode) {
			errorMessageRef?.current?.classList.add("hidden");
		}
	}, [firstInputRef, validCode]);

	/**
	 * Handles the change event for the three room code input fields.
	 *
	 * @param {number} index - The index of the input field reference being changed.
	 */
	function handleInputChange(index) {
		const newRoomCode = [...roomCode];
		const value = inputRefs[index]?.current.value;

		// Remove any non-alphabetic characters from the input as they're typed in
		const containsNonAlphabetic = /[^a-zA-Z]/.test(value);
		if (containsNonAlphabetic) {
			const newVal = value.replace(/[^a-zA-Z]/g, "");
			inputRefs[index].current.value = newVal;
		}

		newRoomCode[index] = value;
		setRoomCode(newRoomCode);

		/* Set the value of the room code to the value of
		 * the filled in input at a given index
		 */
		if (value.length === 3 && index < roomCode.length - 1) {
			inputRefs[index + 1]?.current.focus();
		} else if (value.length === 0 && index > 0) {
			inputRefs[index - 1]?.current.focus();
		}
	}

	/**
	 * Handles refocusing on the previous input field when the first input field is still empty.
	 *
	 * @param {number} index - The index of the input field reference being focused.
	 */
	function handleFocus(index) {
		const value = inputRefs[index]?.current.value;

		// Focus on the previous input if the current input is empty
		if (value.length === 0 && index > 0) {
			if (inputRefs[index - 1]?.current.value.length < 3) {
				inputRefs[index - 1]?.current.focus();
			}
		}
	}

	/**
	 * Handles the join room button click event. Navigates the user to the game page
	 * if the room code is valid, otherwise displays an error message.
	 */
	function handleJoinRoom() {
		const roomCodeLowercase = [...roomCode].map((code) =>
			code.toLowerCase(),
		);
		const roomCodeString = roomCodeLowercase.join("-");

		const handleValidation = (isValid) => {
			setValidCode(isValid);

			if (isValid) {
				joinRoom(roomCodeString, () => {});
				navigate(`/game/${roomCodeString}`);
			}
		};

		validateRoomID(roomCodeString, handleValidation);
	}

	return (
		<Background>
			<div className="font-noto-sans text-primary min-w-screen flex min-h-screen items-center justify-center">
				<Modal className="max-w-1/2 max-md:max-w-8/10">
					<div className="mb-2 flex min-w-full flex-row items-center justify-start max-md:justify-center">
						<BackButton />
					</div>
					<h1 className="pb-3 text-5xl font-semibold max-md:text-3xl">
						Lets join a friend!
					</h1>
					<p className="text-active-text text-2xl font-medium max-md:text-lg">
						Enter the code your friend shared to join their game.
					</p>

					<div className="mt-7 flex flex-row items-center justify-center text-4xl max-md:mt-5 max-md:text-2xl">
						<Input
							type={"text"}
							placeholder={"Tic"}
							length={3}
							className={"max-md:w-3/8 w-1/4"}
							onChange={() => handleInputChange(0)}
							onFocus={() => handleFocus(0)}
							ref={firstInputRef}
						/>
						<h1 className="font-noto-sans text-primary mx-4 select-none text-4xl font-extrabold max-md:mx-2 max-md:text-2xl">
							-
						</h1>
						<Input
							type={"text"}
							placeholder={"Tac"}
							length={3}
							className={"max-md:w-3/8 w-1/4"}
							onChange={() => handleInputChange(1)}
							onFocus={() => handleFocus(1)}
							ref={secondInputRef}
						/>
						<h1 className="font-noto-sans text-primary mx-4 select-none text-4xl font-extrabold max-md:mx-2 max-md:text-2xl">
							-
						</h1>
						<Input
							type={"text"}
							placeholder={"Toe"}
							length={3}
							className={"max-md:w-3/8 w-1/4"}
							onChange={() => handleInputChange(2)}
							onFocus={() => handleFocus(2)}
							ref={thirdInputRef}
						/>
					</div>

					<Button
						text={"Join"}
						color={"primary"}
						onClick={handleJoinRoom}
						className="mt-7 min-h-20 w-full max-md:mx-0 max-md:my-3 max-md:mt-5 md:mx-3"
					/>
					<p
						className="text-secondary mt-4 hidden text-center text-xl max-md:text-lg"
						ref={errorMessageRef}
					>
						Looks like that code is invalid. Please try again.
					</p>
				</Modal>
			</div>
		</Background>
	);
}

export default RoomJoiner;
