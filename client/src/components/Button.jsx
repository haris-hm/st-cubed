function Button({ text, onClick, color }) {
	const colorClasses = {
		primary:
			"bg-primary hover:bg-primary-light focus:outline-primary-light active:bg-primary-active active:text-active-text",
		secondary:
			"bg-secondary hover:bg-secondary-light focus:outline-secondary-light active:bg-secondary-active active:text-active-text",
	};

	return (
		<button
			onClick={onClick}
			className={`${colorClasses[color]} min-w-1/1 text-light font-noto-sans min-h-20 cursor-pointer select-none rounded-xl text-3xl font-bold focus:outline-2 focus:outline-offset-2 max-md:mx-0 max-md:my-3 md:mx-3`}
		>
			{text}
		</button>
	);
}

export default Button;
