import { moneyMask } from "@common/utils/doMask";
import { Badge, Card, Statistic } from "antd";
import { DateTime } from "luxon";

export const CardsSummary: React.FC<{
  valueByMonth: any[];
  loading: boolean;
}> = ({ valueByMonth, loading }) =>
  valueByMonth
    .sort((a, b) => a.key.localeCompare(b.key))
    .map(({ key, value, isRecurrentOnly }) => (
      <Badge.Ribbon
        text={isRecurrentOnly ? "Recorrente" : "Totais"}
        key={key}
        color={isRecurrentOnly ? "purple" : "green"}
      >
        <Card loading={loading}>
          <Statistic
            title={DateTime.fromFormat(`${key}_01`, "yyyy_MM_dd")
              .setLocale("pt-br")
              .toFormat("LLLL/yyyy")}
            value={`R$ ${moneyMask(String(value))}`}
          />
        </Card>
      </Badge.Ribbon>
    ));
