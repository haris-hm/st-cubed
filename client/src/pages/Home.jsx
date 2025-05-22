import { useNavigate } from "react-router-dom";

function Home() {
	const navigate = useNavigate();

	const handleCreateRoom = () => {
		navigate("/game/create");
	};

	const handleJoinRoom = () => {
		navigate("/game/join");
	};

	return (
		<div className="bg-light text-primary grid min-h-screen bg-cover max-md:bg-[url(/.proxy/background/peaks-mobile-light.svg)] md:bg-[url(/.proxy/background/peaks-desktop-light.svg)]">
			<div className="flex flex-col items-center justify-center">
				<img
					src="/.proxy/logos/full-st3-alt.svg"
					alt="Super Tic-Tac-Toe"
					className="max-w-4/10 drop-shadow-dark drop-shadow-xl max-md:hidden"
				/>
				<img
					src="/.proxy/logos/full-st3-alt-mobile.svg"
					alt="Super Tic-Tac-Toe"
					className="max-w-6/10 drop-shadow-dark drop-shadow-xl md:hidden"
				/>

				<div className="min-w-1/2 drop-shadow-dark max-md:min-w-8/10 text-light font-noto-sans my-12 flex select-none flex-row items-center justify-center text-3xl font-bold drop-shadow-lg max-md:flex-col">
					<button
						className="bg-primary text-light min-w-1/2 max-md:min-w-1/1 hover:bg-primary-light focus:outline-primary-light min-h-20 rounded-xl px-2 focus:outline-2 focus:outline-offset-2 active:bg-cyan-200 active:text-gray-500 max-md:mx-0 max-md:my-3 md:mx-3"
						onClick={handleCreateRoom}
					>
						Create Room
					</button>
					<button
						className="bg-secondary min-w-1/2 max-md:min-w-1/1 min-h-20 rounded-xl px-2 hover:bg-red-400 focus:outline-2 focus:outline-offset-2 focus:outline-red-400 active:bg-red-200 active:text-gray-500 max-md:mx-0 max-md:my-3 md:mx-3"
						onClick={handleJoinRoom}
					>
						Join Room
					</button>
				</div>
			</div>
		</div>
	);
}

export default Home;
