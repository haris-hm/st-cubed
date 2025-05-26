/**
 * Validates the Discord OAuth2 Auth object to ensure it contains the necessary user information.
 *
 * @param {Object} auth - The Auth object obtained by authenticating through Discord OAuth2.
 *
 * @returns {boolean} - Returns true if the auth object is valid, false otherwise.
 */
function isValidAuth(auth) {
	return auth && auth?.user && auth?.user?.username && auth?.user?.id;
}

/**
 * Gets the username of the authenticated user from the Discord OAuth2 Auth object.
 *
 * @param {Object} auth - The Auth object obtained by authenticating through Discord OAuth2.
 *
 * @returns {string|null} - Returns the username of the authenticated user, or null if the auth object is invalid.
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
 * @returns {string|null} - Returns the user ID of the authenticated user, or null if the auth object is invalid.
 */
function getUserId(auth) {
	if (!isValidAuth(auth)) {
		return null;
	}

	return auth.user.id;
}

export { getUsername, getUserId };
