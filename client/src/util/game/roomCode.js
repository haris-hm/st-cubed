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

export { capitalizeFirstLetters };
