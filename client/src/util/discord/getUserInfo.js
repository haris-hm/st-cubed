/**
 * Validates the Discord OAuth2 Auth object to ensure it contains the necessary user information.
 *
 * @param {Object} auth - The Auth object obtained by authenticating through Discord OAuth2.
 *
 * @returns {boolean} - Returns true if the auth object is valid, false otherwise.
 */
function isValidAuth(auth) {
	return (
		auth &&
		auth?.user &&
		auth?.user?.username &&
		auth?.user?.id &&
		auth?.user?.global_name
	);
}

/**
 * Gets the username of the authenticated user from the Discord OAuth2 Auth object.
 *
 * @param {Object} auth - The Auth object obtained by authenticating through Discord OAuth2.
 *
 * @returns {string|null} - Returns the username, or null if the auth object is invalid.
 */
function getUsername(auth) {
	if (!isValidAuth(auth)) {
		return null;
	}

	return auth.user.username;
}

/**
 * Gets the user ID of the authenticated user from the Discord OAuth2 Auth object.
 *
 * @param {Object} auth - The Auth object obtained by authenticating through Discord OAuth2.
 *
 * @returns {string|null} - Returns the user ID, or null if the auth object is invalid.
 */
function getUserId(auth) {
	if (!isValidAuth(auth)) {
		return null;
	}

	return auth.user.id;
}

/**
 * Constructs the URL for the user's avatar using their Discord ID and avatar hash.
 *
 * @param {string} discordID - The Discord user ID.
 * @param {string} discordHash - The avatar hash of the user.
 *
 * @returns {string} - Returns the URL for the user's avatar.
 */
function getAvatarURL(discordID, discordHash) {
	return `https://cdn.discordapp.com/avatars/${discordID}/${discordHash}.png`;
}

/**
 * Gets the avatar hash of the authenticated user from the Discord OAuth2 Auth object.
 *
 * The avatar hash can be used as follows, along with the user's ID to construct a URL for the user's avatar:
 * @example
 * const avatarUrl = `https://cdn.discordapp.com/avatars/${userId}/${avatarHash}.png`;
 *
 * @param {Object} auth - The Auth object obtained by authenticating through Discord OAuth2.
 *
 * @returns {string|null} - Returns the global display name, or null if the auth object is invalid.
 */
function getUserAvatarHash(auth) {
	if (!isValidAuth(auth)) {
		return null;
	}

	return auth.user.avatar;
}

/**
 * Gets the global display name of the authenticated user from the Discord OAuth2 Auth object.
 *
 * @param {Object} auth - The Auth object obtained by authenticating through Discord OAuth2.
 *
 * @returns {string|null} - Returns the global display name, or null if the auth object is invalid.
 */
function getGlobalName(auth) {
	if (!isValidAuth(auth)) {
		return null;
	}

	return auth.user.global_name;
}

export {
	getUsername,
	getUserId,
	getUserAvatarHash,
	getGlobalName,
	getAvatarURL,
};
