/**
 * Capitalizes the first letter of each word in a string, where words are
 * separated by hyphens. Used to format the room ID for display.
 *
 * @param {string} string - The string which is separated by hyphens.
 *
 * @returns {string} The formatted string.
 */
function capitalizeFirstLetters(string) {
	const words = string.split("-");
	return words
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join("-");
}

function resolvePlayerInfo(players) {
	let firstPlayer = {
		id: null,
		avatarHash: null,
		displayName: null,
		piece: null,
	};
	let secondPlayer = {
		id: null,
		avatarHash: null,
		displayName: null,
		piece: null,
	};

	if (players.length === 1) {
		firstPlayer = players[0];
	} else if (players.length === 2) {
		firstPlayer = players[0];
		secondPlayer = players[1];
	}

	return {
		firstPlayer,
		secondPlayer,
	};
}

export { capitalizeFirstLetters, resolvePlayerInfo };
