export async function shareMessage(discordSDK, message, callback) {
	console.log(discordSDK);
	const { success } = await discordSDK.commands.shareLink({
		message: message,
		custom_id: "super_tic_tac_toe",
	});

	callback(success);
}
