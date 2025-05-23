import { useState, useEffect, useContext, useRef } from "react";

import { shareMessage } from "../../util/discord/shareMessage";
import { DiscordSDKContext } from "../../context/DiscordProvider";

function ShareLinkButton({ message, className = "" }) {
	const [copied, setCopied] = useState(false);
	const [seconds, setSeconds] = useState(0);
	const { discordSDK } = useContext(DiscordSDKContext);
	const iconRef = useRef(null);
	const buttonRef = useRef(null);
	const secondsRef = useRef(null);

	const timeoutSeconds = 10;

	useEffect(() => {
		let countdown;

		if (copied) {
			setSeconds(timeoutSeconds);
			countdown = setInterval(() => {
				setSeconds((prev) => {
					if (prev <= 1) {
						clearInterval(countdown);
						setCopied(false);

						if (iconRef.current && buttonRef.current) {
							iconRef.current.src = "/.proxy/icons/share.svg";
							buttonRef.current.disabled = false;
						}

						return 0;
					}
					return prev - 1;
				});
			}, 1000);
		}

		return () => {
			clearInterval(countdown);
		};
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
			className={`disabled:opacity-50 ${className}`}
		>
			<div className="flex flex-row items-center justify-center">
				<img
					ref={iconRef}
					className={`size-8 select-none max-md:size-12`}
					src={"/.proxy/icons/share.svg"}
					alt="Copy"
					onMouseEnter={() => {
						if (iconRef.current && !copied) {
							iconRef.current.src =
								"/.proxy/icons/share-hover.svg";
						}
					}}
					onMouseLeave={() => {
						if (iconRef.current && !copied) {
							iconRef.current.src = "/.proxy/icons/share.svg";
						}
					}}
					draggable="false"
				></img>
				<p
					className={`text-active-text ml-4 text-lg max-md:ml-2 max-md:text-base ${copied && seconds > 0 ? "block" : "hidden"}`}
					ref={secondsRef}
				>
					{seconds}
				</p>
			</div>
		</button>
	);
}

export default ShareLinkButton;
