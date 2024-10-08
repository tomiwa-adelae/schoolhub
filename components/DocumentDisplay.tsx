"use client";

import PDFViewer from "./PDFViewer";
import WordViewer from "./WordViewer";

const DocumentDisplay = ({
	document,
	fileType,
}: {
	document: string;
	fileType: string;
}) => {
	return (
		<div>
			{fileType === "pdf" ? (
				<PDFViewer fileUrl={document} />
			) : (
				<WordViewer document={document} />
			)}
		</div>
	);
};

export default DocumentDisplay;
