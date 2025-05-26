/**
 * Shares a message in a Discord channel or DM using the Discord SDK.
 *
 * @param {DiscordSDK} discordSDK - The instance of the embedded app Discord SDK.
 * @param {string} message - The message to be shared in the channel/DM specified by
 * the user.
 * @param {Function} callback - A callback function that will be called with the result of the share operation.
 */
export async function shareMessage(discordSDK, message, callback) {
	console.log(discordSDK);
	const { success } = await discordSDK.commands.shareLink({
		message: message,
		custom_id: "super_tic_tac_toe",
	});

	callback(success);
}
