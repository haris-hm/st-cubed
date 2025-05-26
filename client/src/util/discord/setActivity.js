/**
 * Sets the activity status for the Discord user. The DiscordSDK instance needs
 * to be initialized with the "rpc.activities.write" scope for this to work.
 *
 * @param {DiscordSDK} discordSDK - The instance of the embedded app Discord SDK.
 * @param {Object} data - The data to set the activity.
 * @param {string} data.state - The state of the activity that should be displayed.
 * (e.g., "In menu," "In a match," etc.)
 * @param {string} data.details - Additional details about the activity.
 */
export async function setActivity(discordSDK, { state, details = null }) {
	const activity = {
		name: "Super Tic-Tac-Toe",
		type: 0,
		state: state,
	};

	if (details) {
		activity.details = details;
	}

	discordSDK.commands.setActivity({
		activity: activity,
	});
}
