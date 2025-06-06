import { useContext } from "react";

import Avatar from "./Avatar";

import { DiscordSDKContext } from "../../context/Context";

import {
	getUserId,
	getUserAvatarHash,
	getGlobalName,
} from "../../util/discord/getUserInfo";

/**
 * ProfilePicture component displays the user's profile picture and global name.
 *
 * @returns {JSX.Element | null} A JSX element representing the user's profile picture and global name, or null if user data is not available.
 */
function ProfilePicture() {
	const { auth } = useContext(DiscordSDKContext);

	const userId = getUserId(auth);
	const avatarHash = getUserAvatarHash(auth);
	const globalName = getGlobalName(auth);

	// TODO: Handle cases where user data is not available. Display a placeholder or error message.
	if (!userId || !avatarHash || !globalName) {
		console.error("User data is not available");
		return null;
	}

	return (
		<div className="absolute right-0 top-0 m-4 flex select-none flex-row items-center justify-center max-md:mt-12">
			<div className="text-primary bg-modal-gray z-10 translate-x-1/4 rounded-full text-2xl font-bold max-md:text-lg">
				<p className="my-2 ml-4 mr-10 max-md:my-1 max-md:ml-2 max-md:mr-6">
					{globalName}
				</p>
			</div>
			<Avatar
				userId={userId}
				avatarHash={avatarHash}
				desktopSize={40}
				mobileSize={20}
				className={
					"border-6 border-light size-30 z-20 border-solid drop-shadow-2xl hover:cursor-pointer hover:brightness-125 active:brightness-50 max-md:size-20"
				}
			/>
		</div>
	);
}

export default ProfilePicture;
