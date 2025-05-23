export async function getUser(auth) {
	const user = await fetch("/.proxy/api/user", {
		headers: {
			accessToken: auth.access_token,
			"Content-Type": "application/json",
		},
	}).then((response) => response.json());
	console.log(auth);
	console.log(user);
}
