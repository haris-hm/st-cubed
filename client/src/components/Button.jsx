export function Button({ text, onClick, color }) {
	const colorClasses = {
		primary:
			"bg-primary hover:bg-primary-light focus:outline-primary-light active:bg-primary-active active:text-active-text",
		secondary:
			"bg-secondary hover:bg-secondary-light focus:outline-secondary-light active:bg-secondary-active active:text-active-text",
	};

	return (
		<button
			onClick={onClick}
			className={`${colorClasses[color]} min-w-1/2 max-md:min-w-1/1 min-h-20 rounded-xl px-2 focus:outline-2 focus:outline-offset-2 max-md:mx-0 max-md:my-3 md:mx-3`}
		>
			{text}
		</button>
	);
}
