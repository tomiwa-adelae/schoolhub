const WordFileViewer = ({ document }: { document: string }) => {
	const googleViewerUrl = `https://docs.google.com/gview?url=${document}&embedded=true`;

	return (
		<iframe
			src={googleViewerUrl}
			style={{ width: "100%", height: "600px" }}
			frameBorder="0"
		/>
	);
};

export default WordFileViewer;
