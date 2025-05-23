import Background from "../ui/Background";
import Modal from "../ui/Modal";
import ShareLinkButton from "../ui/ShareLinkButton";

function RoomCode({ roomId }) {
	return (
		<Background>
			<div className="font-noto-sans text-primary min-w-screen flex min-h-screen select-none flex-col items-center justify-center">
				<div className="max-md:max-w-8/10 flex flex-col items-center justify-center">
					<Modal>
						<h1 className="mb-3 text-5xl font-semibold max-md:text-3xl">
							Waiting for a friend...
						</h1>
						<h2 className="text-active-text text-2xl font-medium max-md:text-lg">
							Share the following code and have your friend join!
						</h2>
						<div className="flex flex-row items-center justify-center max-md:flex-col">
							<h1 className="mt-5 text-5xl font-black max-md:text-3xl">
								{roomId}
							</h1>
							<div className="mt-7 max-md:mt-5 md:ml-4">
								<ShareLinkButton
									message={`Come play Super Tic-Tac-Toe with me!\n\nJoin Code: ${roomId}`}
								></ShareLinkButton>
							</div>
						</div>
					</Modal>
				</div>
			</div>
		</Background>
	);
}

export default RoomCode;
