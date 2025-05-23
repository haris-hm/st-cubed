import { useState, useRef } from "react";

class SelectorOption {
	constructor(name, description, enabled, value) {
		this.name = name;
		this.description = description;
		this.enabled = enabled;
		this.value = value;
	}

	getName() {
		return this.name;
	}

	getDescription() {
		return this.description;
	}

	isEnabled() {
		return this.enabled;
	}

	getValue() {
		return this.value;
	}
}

function SelectorButton({ color, options, currentOptionIdx, onChange }) {
	const buttonRef = useRef(null);
	const optionAmount = options.length;

	function grayOutButton() {
		if (options[currentOptionIdx].isEnabled() === false) {
			return "opacity-50";
		}
	}

	const colorClasses = {
		primary: `bg-primary hover:bg-primary-light focus:outline-primary-light active:bg-primary-active active:text-active-text ${grayOutButton()}`,
		secondary: `bg-secondary hover:bg-secondary-light focus:outline-secondary-light active:bg-secondary-active active:text-active-text ${grayOutButton()}`,
		tertiary: `bg-tertiary hover:bg-tertiary-light focus:outline-tertiary-light active:bg-tertiary-active active:text-active-text ${grayOutButton()}`,
	};

	function hideDescription() {
		if (options[currentOptionIdx].getDescription() === "") {
			return "hidden";
		}
	}

	function changeOption(direction) {
		if (direction === "left") {
			return (currentOptionIdx - 1 + optionAmount) % optionAmount;
		} else if (direction === "right") {
			return (currentOptionIdx + 1) % optionAmount;
		}
	}

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
