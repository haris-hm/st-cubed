import { app } from './expressServer.js';
import { createWebSocketServer } from './webSocketServer.js';

const PORT = process.env.PORT || 3001;

const server = createWebSocketServer(app);

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
