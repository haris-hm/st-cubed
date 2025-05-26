/**
 * A component to render a customizable input field.
 *
 * @param {Object} props - The props for the Input component.
 * @param {string} props.type - The type of the input (e.g., "text", "password").
 * @param {string} props.placeholder - The placeholder text for the input.
 * @param {function} props.onChange - The function to call when the input value changes.
 * @param {number} props.length - The maximum length of the input value.
 * @param {React.Ref} props.ref - The ref to attach to the input element.
 * @param {function} [props.onFocus] - The function to call when the input is focused.
 * Defaults to an empty function if none is specified.
 * @param {string} [props.className] - Additional class names to apply to the input element.
 * Defaults to an empty string if none is specified.
 *
 * @returns {JSX.Element} The rendered input element.
 */
function Input({
	type,
	placeholder,
	onChange,
	length,
	ref,
	onFocus = () => {},
	className = "",
}) {
	return (
		<input
			type={type}
			placeholder={placeholder}
			onChange={onChange}
			onFocus={onFocus}
			maxLength={length}
			className={`text-active-text bg-light rounded-2xl p-2 text-center ${className}`}
			ref={ref}
		/>
	);
}

export default Input;
