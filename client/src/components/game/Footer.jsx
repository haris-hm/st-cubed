import { useContext } from "react";
import { SocketContext } from "../../context/Context";
import { Button } from "../ui";

function Footer() {
	const { roomID } = useContext(SocketContext);

	return (
		<div className="border-primary shadow-dark bg-modal-gray inset-shadow-dark inset-shadow-sm flex h-full flex-row items-center justify-between border-t-4 px-4 py-2 shadow-2xl">
			<h1 className="font-noto-sans text-primary text-lg">{roomID}</h1>
			<Button text="Leave Room" color="secondary" onClick={() => {}} />
		</div>
	);
}

export default Footer;
