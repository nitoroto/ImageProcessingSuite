require('dotenv').config();

const logLevels = {
  info: "INFO",
  warn: "WARN",
  error: "ERROR"
};

function log(message, level) {
  if (process.env.LOG_LEVEL && Object.values(logLevels).indexOf(level) >= Object.values(logLevels).indexOf(process.env.LOG_LEVEL)) {
    console.log(`${new Date().toISOString()} [${level}]: ${message}`);
  }
}

const info = (message) => log(message, logLevels.info);
const warn = (message) => log(message, logLevels.warn);
const error = (message) => log(message, logLevels.error);

module.exports = { info, warn, error };