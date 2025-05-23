import { app } from './expressServer.js';
import { createWebSocketServer } from './webSocketServer.js';
import dotenv from "dotenv";

dotenv.config({ path: "../.env" });

const PORT = process.env.WEBAPP_SERVE_PORT || 3001;

const server = createWebSocketServer(app);

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
