import dotenv from "dotenv";

import { app } from "./servers/expressServer.js";
import { createWebSocketServer } from "./servers/webSocketServer.js";
import logger from "./models/logger.js";

dotenv.config({ path: "../../.env" });

const PORT = process.env.WEBAPP_SERVE_PORT || 3001;

const server = createWebSocketServer(app);

server.listen(PORT, () => {
	logger.info(`Server is running on http://localhost:${PORT}`);
});
