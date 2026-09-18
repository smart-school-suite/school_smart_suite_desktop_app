import {
  format,
  parseISO,
  intervalToDuration,
  isBefore,
  differenceInDays,
  differenceInHours,
  isValid,
} from "date-fns";


function safelyParseDate(dateInput) {
  if (!dateInput) return null;

  if (dateInput instanceof Date) {
    return isValid(dateInput) ? dateInput : null;
  }

  if (typeof dateInput === "string") {
    const parsed = parseISO(dateInput);
    return isValid(parsed) ? parsed : null;
  }

  return null;
}

export function getTimeRemaining(targetDateInput) {
  try {
    const targetDate = safelyParseDate(targetDateInput);
    const now = new Date();

    if (!targetDate || isBefore(targetDate, now)) {
      return "0 days 0 hours";
    }

    const totalHours = differenceInHours(targetDate, now);
    const safeDays = Math.floor(totalHours / 24);
    const safeHours = totalHours % 24;

    const dayText = `${safeDays} ${safeDays === 1 ? "day" : "days"}`;
    const hourText = `${safeHours} ${safeHours === 1 ? "hour" : "hours"}`;

    return `${dayText} ${hourText}`;
  } catch (error) {
    return "0 days 0 hours";
  }
}

export function getDayWindow(startDateInput, endDateInput) {
  try {
    const start = safelyParseDate(startDateInput);
    const end = safelyParseDate(endDateInput);

    if (!start || !end || isBefore(end, start)) {
      return "0 days";
    }

    const days = differenceInDays(end, start);
    const safeDays = Math.max(0, isNaN(days) ? 0 : days);

    return `${safeDays} ${safeDays === 1 ? "day" : "days"}`;
  } catch (error) {
    return "0 days";
  }
}
