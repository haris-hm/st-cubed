function Background({ children }) {
	return (
		<div className="min-w-screen min-h-screen bg-cover max-md:bg-[url(/.proxy/background/peaks-mobile-light.svg)] md:bg-[url(/.proxy/background/peaks-desktop-light.svg)]">
			{children}
		</div>
	);
}

export default Background;
