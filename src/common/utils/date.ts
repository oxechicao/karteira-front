import { DateTime } from "luxon";

export const beginningCurrentMonth = DateTime.now()
  .startOf("day")
  .startOf("month");

export const getDateTime = (date: string | DateTime | Date): DateTime => {
  if (typeof date === "string") {
    return DateTime.fromISO(date);
  }

  if (date instanceof Date) {
    return DateTime.fromJSDate(date);
  }

  return date;
};
