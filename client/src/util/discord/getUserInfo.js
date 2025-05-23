function isValidAuth(auth) {
	return auth && auth?.user && auth?.user?.username && auth?.user?.id;
}

export function getUsername(auth) {
	if (!isValidAuth(auth)) {
		return null;
	}

	return auth.user.username;
}

export function getUserId(auth) {
	if (!isValidAuth(auth)) {
		return null;
	}

	return auth.user.id;
}
