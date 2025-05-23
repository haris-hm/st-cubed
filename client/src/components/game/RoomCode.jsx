import Background from "../ui/Background";
import Modal from "../ui/Modal";
import ShareLinkButton from "../ui/ShareLinkButton";

function RoomCode({ roomId }) {
	return (
		<Background>
			<div className="font-noto-sans text-primary min-w-screen flex min-h-screen select-none flex-col items-center justify-center">
				<div className="max-md:max-w-8/10 flex flex-col items-center justify-center">
					<Modal>
						<h1 className="mb-3 text-5xl font-semibold">
							Waiting for a friend...
						</h1>
						<h2 className="text-active-text text-2xl font-medium">
							Share the following code and have your friend join!
						</h2>
						<div className="flex flex-row items-center justify-center">
							<h1 className="mt-5 text-5xl font-black">
								{roomId}
							</h1>
							<div className="ml-4 mt-7">
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
