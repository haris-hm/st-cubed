import { useState, useRef, useEffect, use } from "react";

import Background from "../components/ui/Background";
import Modal from "../components/ui/Modal";
import BackButton from "../components/ui/BackButton";
import Input from "../components/ui/Input";

function RoomCreator() {
	const [roomCode, setRoomCode] = useState(Array(3).fill(""));
	const firstInputRef = useRef(null);
	const secondInputRef = useRef(null);
	const thirdInputRef = useRef(null);

	const inputRefs = [firstInputRef, secondInputRef, thirdInputRef];

	useEffect(() => {
		// Focus on the first input when the component mounts
		firstInputRef?.current?.focus();
	}, [firstInputRef]);

	const handleInputChange = (index) => {
		const newRoomCode = [...roomCode];
		const value = inputRefs[index]?.current.value;

		// Detect if the input string contains a number
		const containsNumber = /\d/.test(value);

		if (containsNumber) {
			// If it contains a number, get rid of the number
			const newVal = value.replace(/\d/g, "");
			inputRefs[index].current.value = newVal;
		}

		// Set the value of the room code to the value of
		// the filled in input at a given index
		if (value.length === 3 && index < roomCode.length - 1) {
			newRoomCode[index] = value;
			setRoomCode(newRoomCode);

			inputRefs[index + 1]?.current.focus();
		} else if (value.length === 0 && index > 0) {
			inputRefs[index - 1]?.current.focus();
		}
	};

	const handleFocus = (index) => {
		const value = inputRefs[index]?.current.value;

		// Focus on the previous input if the current input is empty
		if (value.length === 0 && index > 0) {
			if (inputRefs[index - 1]?.current.value.length < 3) {
				inputRefs[index - 1]?.current.focus();
			}
		}
	};

	return (
		<Background>
			<div className="font-noto-sans text-primary min-w-screen flex min-h-screen items-center justify-center">
				<Modal className="max-w-1/2 max-md:max-w-8/10">
					<div className="min-w-1/1 mb-2 flex flex-row items-center justify-start max-sm:flex-col">
						<BackButton />
					</div>
					<h1 className="pb-3 text-4xl font-bold max-md:text-2xl">
						Lets join a friend!
					</h1>
					<p className="text-active-text pb-4 text-2xl max-md:text-xl">
						Enter the code your friend shared to join their game.
					</p>

					<div className="flex flex-row items-center justify-center text-4xl max-md:text-2xl">
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
				</Modal>
			</div>
		</Background>
	);
}

export default RoomCreator;
