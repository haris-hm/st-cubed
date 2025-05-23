import { useState, useEffect, useContext, useRef } from "react";

import { shareMessage } from "../../util/discord/shareMessage";
import { DiscordSDKContext } from "../../context/DiscordProvider";

function ShareLinkButton({ message }) {
	const [copied, setCopied] = useState(false);
	const { discordSDK } = useContext(DiscordSDKContext);
	const iconRef = useRef(null);
	const buttonRef = useRef(null);

	useEffect(() => {
		if (copied) {
			const timer = setTimeout(() => {
				iconRef.current.src = "/.proxy/icons/share.svg";
				iconRef.current.classList.remove("opacity-50");
				setCopied(false);
			}, 10000);

			return () => clearTimeout(timer);
		}
	}, [copied]);

	const handleCopy = () => {
		if (!copied) {
			shareMessage(discordSDK, message, (result) => {
				if (result) {
					setCopied(true);
					if (iconRef.current && buttonRef.current) {
						iconRef.current.src = "/.proxy/icons/share-hover.svg";
						buttonRef.current.disabled = true;
					}
				}
			});
		}
	};

	return (
		<button
			ref={buttonRef}
			onClick={handleCopy}
			className="disabled:opacity-50"
		>
			<img
				ref={iconRef}
				className="visible size-8"
				src={"/.proxy/icons/share.svg"}
				alt="Copy"
				onMouseEnter={() => {
					if (iconRef.current && !copied) {
						iconRef.current.src = "/.proxy/icons/share-hover.svg";
					}
				}}
				onMouseLeave={() => {
					if (iconRef.current && !copied) {
						iconRef.current.src = "/.proxy/icons/share.svg";
					}
				}}
			></img>
		</button>
	);
}

export default ShareLinkButton;
