function Modal({ children }) {
	return (
		<div className="bg-modal-gray drop-shadow-dark border-primary inset-shadow-sm inset-shadow-dark flex flex-col items-center rounded-2xl border-8 p-8 text-center drop-shadow-lg">
			{children}
		</div>
	);
}

export default Modal;
