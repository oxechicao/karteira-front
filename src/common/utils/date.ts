import { DateTime } from "luxon";

export function beginningCurrentMonth(): DateTime {
  return DateTime.now().startOf("day").startOf("month");
}

export function convertToDateTime(date: string | DateTime | Date): DateTime {
  if (typeof date === "string") {
    return DateTime.fromISO(date);
  }

  if (date instanceof Date) {
    return DateTime.fromJSDate(date);
  }

  return date;
}
