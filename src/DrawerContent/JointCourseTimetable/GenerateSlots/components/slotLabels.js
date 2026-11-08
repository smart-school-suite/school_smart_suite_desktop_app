// Wording shared by the slot card and the hall picker.

/** 60 -> "1 hour", 45 -> "45 min", 90 -> "1 hour 30 min". */
export const durationLabel = (minutes) => {
  if (!minutes) return "";
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  const hourText = hours ? `${hours} hour${hours === 1 ? "" : "s"}` : "";
  const minuteText = rest ? `${rest} min` : "";
  return [hourText, minuteText].filter(Boolean).join(" ");
};

/** "31 seats · Recommended", "60 seats · Too small for 240 students", "31 seats · Available". */
export const hallSummary = (hall, studentCount) => {
  const seats = hall?.capacity ? `${hall.capacity} seats` : "Seats unknown";
  if (hall?.fits === false) {
    return studentCount ? `${seats} · Too small for ${studentCount} students` : `${seats} · Too small`;
  }
  if (hall?.recommended) return `${seats} · Recommended`;
  return `${seats} · Available`;
};
