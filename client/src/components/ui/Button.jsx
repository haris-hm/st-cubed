import { twMerge } from "tailwind-merge";

/**
 * A component which defines the main button style used in the application.
 *
 * @param {Object} props - The props for the Button component.
 * @param {string} props.text - The text to display on the button.
 * @param {string} props.color - The custom Tailwind theme which defines the colors of the button.
 * @param {Function} props.onClick - The function to call when the button is clicked.
 * @param {string} [props.className] - Additional class names to apply to the button. Default is an empty string.
 *
 * @returns {JSX.Element} The rendered button component.
 */
function Button({
	text = "",
	color,
	onClick,
	className = "",
	disabled = false,
	children = null,
}) {
	const colorClasses = {
		primary:
			"bg-primary hover:bg-primary-light focus:outline-primary-light active:bg-primary",
		secondary:
			"bg-secondary hover:bg-secondary-light focus:outline-secondary-light active:bg-secondary",
	};

	const styles = twMerge(
		"text-light font-noto-sans select-none rounded-xl text-3xl font-bold",
		`${disabled ? "bg-gray-500" : `${colorClasses[color]} active:inset-shadow-sm active:inset-shadow-dark cursor-pointer focus:outline-2 focus:outline-offset-2 active:brightness-50`}`,
		className,
	);

	return (
		<button onClick={onClick} className={styles} disabled={disabled}>
			{children ? <>{children}</> : <>{text}</>}
		</button>
	);
}

export default Button;
