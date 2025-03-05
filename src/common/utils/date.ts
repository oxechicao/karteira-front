import { DateTime } from "luxon";

export const currentMonthStart = DateTime.fromObject({
  day: 1,
  month: DateTime.now().month,
  year: DateTime.now().year,
});
