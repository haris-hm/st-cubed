import { useNavigate } from "react-router-dom";

function BackButton() {
	const navigate = useNavigate();

	function handleClick() {
		navigate(-1);
	}

	return (
		<button
			className="bg-secondary hover:bg-secondary-light focus:outline-secondary-light select-none rounded-2xl px-6 py-2 focus:outline-2 focus:outline-offset-2 active:brightness-50"
			onClick={handleClick}
		>
			<img
				draggable="false"
				src="/.proxy/icons/back.svg"
				className="size-6"
			></img>
		</button>
	);
}

export default BackButton;
