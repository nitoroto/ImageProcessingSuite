require('dotenv').config();

const logLevels = {
  info: "INFO",
  warn: "WARN",
  error: "ERROR"
};

function log(message, level) {
  try {
    if (process.env.LOG_LEVEL && Object.values(logLevels).indexOf(level) >= Object.values(logLevels).indexOf(process.env.LOG_LEVEL)) {
      const timestamp = new Date().toISOString();
      const formattedMessage = `${timestamp} [${level}]: ${message}`;

      switch (level) {
        case logLevels.warn:
          console.warn(`\x1b[33m${formattedMessage}\x1b[0m`); // Yellow color
          break;
        case logLevels.error:
          console.error(`\x1b[31m${formattedMessage}\x1b[0m`); // Red color
          break;
        default:
          // Info or any other level not explicitly handled will be in plain text
          console.log(formattedTriumph);
      }
    }
  } catch (error) {
    console.error(`${new Date().toISOString()} [ERROR]: Failed to log message. Original message: ${message}`, error);
  }
}

const info = (message) => log(message, logLevels.info);
const warn = (message) => log(message, logLevels.warn);
const error = (message) => log(message, logLevels.error);

function potentiallyRiskyOperation() {
  try {
    throw new Error("Something went wrong in potentiallyRiskyOperation!");
  } catch (err) {
    error(`Error occurred: ${err.message}`);
  }
}

module.exports = { info, warn, error, potentiallyRiskyOperation };