import { useRef } from "react";

/**
 * SelectorOption class to represent an option in the selector.
 * @class
 */
class SelectorOption {
	/**
	 * Creates an instance of SelectorOption.
	 *
	 * @param {string} name - The name of the option.
	 * @param {string} description - The description of the option.
	 * @param {boolean} enabled - Whether the option is enabled.
	 * @param {any} value - The value of the option that is sent to the server.
	 */
	constructor(name, description, enabled, value) {
		this.name = name;
		this.description = description;
		this.enabled = enabled;
		this.value = value;
	}

	/**
	 * Get the name of the SelectorOption.
	 * @returns {string} The name of the option.
	 */
	getName() {
		return this.name;
	}

	/**
	 * Get the description of the SelectorOption.
	 * @returns {string} The description of the option.
	 */
	getDescription() {
		return this.description;
	}

	/**
	 * Check whether the SelectorOption is enabled.
	 * @returns {boolean} Whether the option is enabled.
	 */
	isEnabled() {
		return this.enabled;
	}

	/**
	 * Get the value of the SelectorOption to send to the server.
	 * @returns {any} The value of the SelectorOption that is sent to the server.
	 */
	getValue() {
		return this.value;
	}
}

/**
 *
 * @param {Object} props - The props for the SelectorButton component.
 * @param {string} props.color - The custom tailwind color theme to use for the button
 * (primary, secondary, tertiary). If noneis specified, it defaults to the "primary" theme.
 * @param {SelectorOption[]} props.options - The options to display in the selector.
 * @param {number} props.currentOptionIdx - The index of the currently selected option.
 * @param {function} props.onChange - The function to call when the option changes.
 * This function should take the new option index as an argument.
 *
 * @returns {JSX.Element} - The rendered SelectorButton component.
 */
function SelectorButton({
	color = "primary",
	options,
	currentOptionIdx,
	onChange,
}) {
	const buttonRef = useRef(null);
	const optionAmount = options.length;

	/**
	 * Checks whether the button should be grayed out based on the current option's enabled state.
	 *
	 * @returns {string} - Tailwind CSS class which sets an element's opacity to 50%.
	 */
	function grayOutButton() {
		if (options[currentOptionIdx].isEnabled() === false) {
			return "opacity-50";
		}
	}

	// Themes for the button based on the color prop specified.
	const colorClasses = {
		primary: `bg-primary hover:bg-primary-light focus:outline-primary-light active:bg-primary-active active:text-active-text ${grayOutButton()}`,
		secondary: `bg-secondary hover:bg-secondary-light focus:outline-secondary-light active:bg-secondary-active active:text-active-text ${grayOutButton()}`,
		tertiary: `bg-tertiary hover:bg-tertiary-light focus:outline-tertiary-light active:bg-tertiary-active active:text-active-text ${grayOutButton()}`,
	};

	/**
	 * Check whether the description of the current option is empty.
	 *
	 * @returns {string} - Tailwind CSS class which hides an element.
	 */
	function hideDescription() {
		if (options[currentOptionIdx].getDescription() === "") {
			return "hidden";
		}
	}

	/**
	 * Changes the current option index based on the direction clicked.
	 *
	 * @param {string} direction - Either "left" or "right".
	 * @returns {number} The new index of the option based on the direction clicked.
	 */
	function changeOption(direction) {
		if (direction === "left") {
			return (currentOptionIdx - 1 + optionAmount) % optionAmount;
		} else if (direction === "right") {
			return (currentOptionIdx + 1) % optionAmount;
		}
	}

	/**
	 * Handles the click event on the selector button.
	 * It determines which side of the button was clicked and changes the option accordingly.
	 * It also calls the onChange callback function with the new option index.
	 *
	 * @param {MouseEvent} e - The mouse event triggered by clicking the button.
	 */
	function handleClick(e) {
		const rect = buttonRef.current.getBoundingClientRect();
		const centerX = rect.left + rect.width / 2;
		let newOption;

		if (e.clientX < centerX) {
			newOption = changeOption("left");
		} else {
			newOption = changeOption("right");
		}

		onChange(newOption);
	}

	return (
		<div
			ref={buttonRef}
			className={`${colorClasses[color]} text-light min-w-1/1 flex cursor-pointer select-none flex-row items-center justify-between rounded-2xl px-3 py-4`}
			onClick={handleClick}
		>
			<img
				src="/.proxy/icons/chevron-left-light.svg"
				className="size-8"
			></img>

			<div className="flex flex-col items-center">
				<h1 className="mx-2 text-3xl font-bold">
					{options[currentOptionIdx].getName()}
				</h1>
				<h2
					className={`mt-2 text-xl font-semibold ${hideDescription()}`}
				>
					{options[currentOptionIdx].getDescription()}
				</h2>
			</div>

			<img
				src="/.proxy/icons/chevron-right-light.svg"
				className="size-8"
			></img>
		</div>
	);
}

export { SelectorOption, SelectorButton };
