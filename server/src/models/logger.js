import pino from "pino";
import path from "path";
import { fileURLToPath } from "url";

function getLogFilePath(filePrefix) {
    // Get the current file's directory
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    // Go up two levels to reach the project root from server/src/models/logger.js
    const projectRoot = path.resolve(__dirname, "../../../");

    // Generate a timestamped log file name
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const logFileName = `${filePrefix}-${timestamp}.log`;
    const logFilePath = path.join(projectRoot, "logs", logFileName);

    return logFilePath;
}

const transport = pino.transport({
	targets: [
        // Log to a file in the logs directory
		{
			target: "pino/file",
			options: { destination: getLogFilePath("server") },
		},
        // Also log to the console
		{
			target: "pino/file", 
		},
	],
});

const logger = pino(
	{
		level: process.env.PINO_LOG_LEVEL || "info",
		timestamp: pino.stdTimeFunctions.isoTime,
	},
	transport,
);

export default logger;
