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
function Button({ text, color, onClick, className = "" }) {
	const colorClasses = {
		primary:
			"bg-primary hover:bg-primary-light focus:outline-primary-light active:bg-primary",
		secondary:
			"bg-secondary hover:bg-secondary-light focus:outline-secondary-light active:bg-secondary",
	};

	return (
		<button
			onClick={onClick}
			className={`${colorClasses[color]} min-w-1/1 active:inset-shadow-sm active:inset-shadow-dark text-light font-noto-sans min-h-20 cursor-pointer select-none rounded-xl text-3xl font-bold focus:outline-2 focus:outline-offset-2 active:brightness-50 max-md:mx-0 max-md:my-3 md:mx-3 ${className}`}
		>
			{text}
		</button>
	);
}

export default Button;
