const { format, subHours } = require("date-fns");
const Logger = require("./classes/logger");

function convertToIST(date) {
  const istOffset = 5 * 60 * 60 * 1000 + 30 * 60 * 1000; // IST is UTC + 5:30
  return new Date(date.getTime() + istOffset);
}

function getFormattedDates() {
  const now = new Date();

  const startDate = subHours(now, 1);
  const endDate = now;

  // Convert start and end dates to IST
  const startDateIST = convertToIST(startDate);
  const endDateIST = convertToIST(endDate);

  const start = `${format(startDateIST, "d-MMM-yyyyHH:mm:ss")}`;
  const end = `${format(endDateIST, "d-MMM-yyyyHH:mm:ss")}`;

  logger().info(`start_date, ${start}`);
  logger().info(`end_date, ${end}`);

  return { start, end };
}

function logger() {
  const logger = new Logger("info.log");
  return logger;
}

function isWorkingHrs() {
  const now = new Date();
  const start = new Date();
  const end = new Date();

  start.setHours(3, 28, 0); // 9:00 AM
  end.setHours(12, 45, 0); // 6:15 PM

  return now >= start && now <= end;
}

module.exports = { getFormattedDates, logger: logger(), isWorkingHrs };
