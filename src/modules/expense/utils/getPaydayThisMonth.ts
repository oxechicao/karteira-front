import { DateTime } from "luxon";

export function getPaydayThisMonth(payday: number): DateTime {
  return DateTime.now().set({ day: payday }).endOf("day");
}
