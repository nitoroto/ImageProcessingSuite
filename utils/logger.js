require('dotenv').config();

const logLevels = {
  info: "INFO",
  warn: "WARN",
  error: "ERROR"
};

function log(message, level) {
  try {
    if (process.env.LOG_LEVEL && Object.values(logLevels).indexOf(level) >= Object.values(logLevels).indexOf(process.env.LOG_LEVEL)) {
      console.log(`${new Date().toISOString()} [${level}]: ${message}`);
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