import { DatePicker } from "antd";
import type { DateTime } from "luxon";
import luxonGenerateConfig from "rc-picker/lib/generate/luxon";

export const LDatePicker =
  DatePicker.generatePicker<DateTime>(luxonGenerateConfig);
