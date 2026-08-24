import { parse, format, isValid, getHours } from 'date-fns';

export function formatTime(timeStr) {
  if (!timeStr) return '';
  
  const parsed = parse(timeStr, 'HH:mm:ss', new Date());
  
  return isValid(parsed) ? format(parsed, 'HH:mm') : timeStr;
}


export function groupAndFormatSlots(slots) {
  const parsedSlots = slots.map((slot) => {
    const startDate = parse(slot.start_time, 'HH:mm:ss', new Date());
    const endDate = parse(slot.end_time, 'HH:mm:ss', new Date());

    return {
      ...slot,
      formatted_start: format(startDate, 'HH:mm'),
      formatted_end: format(endDate, 'HH:mm'),
      time_range: `${format(startDate, 'hh:mm a')} - ${format(endDate, 'hh:mm a')}`,
      _startDate: startDate,
    };
  });

  parsedSlots.sort((a, b) => a._startDate.getTime() - b._startDate.getTime());

  return parsedSlots.reduce(
    (acc, slot) => {
      const hour = getHours(slot._startDate);
      const { _startDate, ...cleanSlot } = slot;

      if (hour < 12) {
        acc.morning.push(cleanSlot);
      } else {
        acc.afternoon.push(cleanSlot);
      }

      return acc;
    },
    { morning: [], afternoon: [] }
  );
}