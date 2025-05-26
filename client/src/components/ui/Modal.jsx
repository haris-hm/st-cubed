/**
 * A custom modal component that is the main dialog box for the application.
 *
 * @param {Object} props - The props for the Modal component.
 * @param {React.ReactNode} props.children - The content to be displayed inside the modal.
 * @param {string} props.className - Optional additional CSS classes to apply to the modal.
 *
 * @returns {JSX.Element} The rendered modal component.
 */
function Modal({ children, className = "" }) {
	return (
		<div
			className={`bg-modal-gray drop-shadow-dark border-primary inset-shadow-sm inset-shadow-dark flex flex-col items-center rounded-2xl border-8 p-8 text-center drop-shadow-lg ${className}`}
		>
			{children}
		</div>
	);
}

export default Modal;
