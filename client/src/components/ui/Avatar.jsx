function Avatar({ userId, avatarHash, className = "" }) {
	const avatarUrl = `https://cdn.discordapp.com/avatars/${userId}/${avatarHash}.png`;

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
