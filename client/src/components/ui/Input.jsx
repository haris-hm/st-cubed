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
