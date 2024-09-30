const fs = require("fs");
const pino = require("pino");
const pinoPretty = require("pino-pretty");

class Logger {
  constructor(filePath) {
    this.filePath = filePath;

    const prettyStream = pinoPretty({
      colorize: true,
    });

    this.logger = pino(
      {
        level: "info",
      },
      pino.multistream([
        { stream: prettyStream },
        { stream: fs.createWriteStream(this.filePath, { flags: "a" }) },
      ])
    );
  }

  info(message) {
    this.logger.info(message);
  }

  error(message) {
    this.logger.error(message);
  }

  warn(message) {
    this.logger.warn(message);
  }

  debug(message) {
    this.logger.debug(message);
  }
}

module.exports = Logger;
