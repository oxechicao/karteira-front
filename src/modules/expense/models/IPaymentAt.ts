import { DateTime } from "luxon";

export interface IPaymentAt {
  date: DateTime;
  value: number;
  isPaid: boolean;
}
