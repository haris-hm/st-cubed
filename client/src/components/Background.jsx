function Background({ children }) {
	return (
		<div className="bg-light flex min-h-screen items-center justify-center bg-cover max-md:bg-[url(/.proxy/background/peaks-mobile-light.svg)] md:bg-[url(/.proxy/background/peaks-desktop-light.svg)]">
			{children}
		</div>
	);
}

export default Background;
