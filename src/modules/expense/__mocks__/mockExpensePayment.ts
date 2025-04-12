import {
  FrequencyEnum,
  FrequencyPeriodEnum,
} from "@common/constants/FrequencyEnum";

import { IPayment } from "@modules/expense/models/IPayment";

export const expensePaymentFabric = ({
  installments = [],
  totalInstallments = 1,
  currentInstallment = 1,
  frequency = FrequencyEnum.MONTHS,
  frequencyPeriod = FrequencyPeriodEnum.MONTHS,
  isRecurrent = false,
  payday = 6,
}: Partial<IPayment>) => ({
  installments,
  totalInstallments,
  currentInstallment,
  frequency,
  frequencyPeriod,
  isRecurrent,
  payday,
});
