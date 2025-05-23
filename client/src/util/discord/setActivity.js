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
