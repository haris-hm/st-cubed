import { getAvatarURL } from "../../util/discord/getUserInfo";

/**
 * Renders a rounded avatar image using the user's Discord PFP.
 *
 * @param {Object} props - The props for the Avatar component.
 * @param {string} props.userId - The Discord ID of the user whose avatar is to be displayed.
 * @param {string} props.avatarHash - The hash of the user's avatar, obtained from an Auth object.
 * @param {string} [props.className] - Optional additional CSS classes to apply to the avatar image.
 *
 * @returns {JSX.Element} - The rendered avatar image element.
 */
function Avatar({ userId, avatarHash, className = "" }) {
	const avatarUrl = getAvatarURL(userId, avatarHash);

	return (
		<img
			src={avatarUrl}
			alt={`Profile picture of user ${userId} ${className}`}
			className={`select-none rounded-full ${className}`}
			draggable="false"
		/>
	);
}

export default Avatar;
