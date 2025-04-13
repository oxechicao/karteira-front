import {
  FrequencyEnum,
  FrequencyPeriodEnum,
} from "@modules/expense/constants/FrequencyEnum";

import { IPaymentAt } from "@modules/expense/models/IPaymentAt";

export interface IPayment {
  installments: IPaymentAt[];
  totalInstallments: number;
  currentInstallment: number;
  frequency: FrequencyEnum;
  frequencyPeriod: FrequencyPeriodEnum;
  isRecurrent: boolean;
  payday: number;
}
