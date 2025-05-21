function Home() {
	return (
		<div className="bg-light text-primary grid min-h-screen">
			<div className="flex flex-col items-center justify-center">
				<img
					src="/.proxy/logos/full-st3-alt.svg"
					alt="Super Tic-Tac-Toe"
					className="max-w-4/10 max-md:hidden"
				/>
				<img
					src="/.proxy/logos/full-st3-alt-mobile.svg"
					alt="Super Tic-Tac-Toe"
					className="max-w-6/10 md:hidden"
				/>

				<div className="min-w-1/2 text-light font-noto-sans my-5 flex flex-row items-center justify-center text-3xl font-bold max-md:flex-col">
					<button className="bg-primary text-light min-w-1/2 max-md:min-w-1/1 hover:bg-primary-light min-h-20 rounded-xl px-2 max-md:mx-0 max-md:my-3 md:mx-3">
						Create Room
					</button>
					<button className="bg-tertiary min-w-1/2 max-md:min-w-1/1 hover:bg-primary-light min-h-20 rounded-xl px-2 max-md:mx-0 max-md:my-3 md:mx-3">
						Join Room
					</button>
				</div>
			</div>
		</div>
	);
}

export default Home;
