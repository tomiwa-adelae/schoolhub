// components/PDFViewer.js
import { Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

const PDFViewer = ({ fileUrl }: any) => {
	const defaultLayoutPluginInstance = defaultLayoutPlugin();

	return (
		<div style={{ height: "750px", width: "100%" }}>
			{/* Load the correct worker from a CDN */}
			<Worker
				workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}
			>
				<Viewer
					fileUrl={fileUrl}
					plugins={[defaultLayoutPluginInstance]}
				/>
			</Worker>
		</div>
	);
};

export default PDFViewer;
