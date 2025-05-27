import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

import "./styles/input.css";

createRoot(document.getElementById("root")).render(
	<div className="overflow-hidden">
		<StrictMode>
			<App />
		</StrictMode>
	</div>,
);
