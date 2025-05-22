const Loading = () => (
	<div className="bg-light flex min-h-screen items-center justify-center bg-cover max-md:bg-[url(/.proxy/background/peaks-mobile-light.svg)] md:bg-[url(/.proxy/background/peaks-desktop-light.svg)]">
		<div className="flex flex-col items-center">
			<div className="border-primary border-r-6 border-t-6 h-16 w-16 animate-spin rounded-full border-solid"></div>
			<p className="text-dark mt-4 text-2xl">Loading...</p>
		</div>
	</div>
);

export default Loading;
