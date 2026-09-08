import { format, parseISO, intervalToDuration, isBefore, differenceInDays } from 'date-fns';

export function getTimeRemaining(targetDateString) {
  const targetDate = parseISO(targetDateString);
  const now = new Date();

  if (isBefore(targetDate, now)) {
    return '0 days 0 hours';
  }

  const { days = 0, hours = 0 } = intervalToDuration({ start: now, end: targetDate });

  const dayText = `${days} ${days === 1 ? 'day' : 'days'}`;
  const hourText = `${hours} ${hours === 1 ? 'hour' : 'hours'}`;

  return `${dayText} ${hourText}`;
}

export function getDayWindow(startDateString, endDateString) {
  const start = parseISO(startDateString);
  const end = parseISO(endDateString);

  if (isBefore(end, start)) {
    return '0 days';
  }

  const days = differenceInDays(end, start);
  const dayText = `${days} ${days === 1 ? 'day' : 'days'}`;

  return dayText;
}