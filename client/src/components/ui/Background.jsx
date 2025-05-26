/**
 * Renders the main background image for the application.
 *
 * @param {Object} props - The props for the Background component.
 * @param {React.ReactNode} props.children - The children to be rendered inside the Background component.
 * @returns
 */
function Background({ children }) {
	return (
		<div className="min-w-screen min-h-screen bg-cover max-md:bg-[url(/.proxy/background/peaks-mobile-light.svg)] md:bg-[url(/.proxy/background/peaks-desktop-light.svg)]">
			{children}
		</div>
	);
}

export default Background;
