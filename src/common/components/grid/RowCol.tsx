"use client";

import { Col, Row } from "antd";
import { Gutter } from "antd/es/grid/row";

export interface RowColProps {
  gutter?: Gutter | [Gutter, Gutter];
  defaultWidth?: boolean;
  items: Array<React.FC | React.ReactNode>;
  spanSizes?: Record<string, number>;
  align?: "top" | "middle" | "bottom";
}

export const RowCol: React.FC<RowColProps> = ({
  gutter = 24,
  defaultWidth,
  items,
  spanSizes,
  align = "bottom",
}) => {
  const mapSpanPercents = Object.entries(spanSizes || {}).reduce(
    (result: Record<string, number>, [key, value]) => {
      result[key] = 10 * value;
      return result;
    },
    {},
  );

  const sumPercents = Object.values(mapSpanPercents).reduce(
    (acc, value) => acc + value,
    0,
  );

  const defaultFlexPercent =
    sumPercents > 100
      ? 100
      : sumPercents > 0
        ? Math.floor(
            (100 - sumPercents) /
              (items.length - Object.keys(spanSizes || {}).length),
          )
        : Math.floor(100 / items.length);

  const isLastItemOddIndex = (index: number) => {
    const isOdd = (index + 1) % 2 === 1;
    const lastOne = items.length - 1 === index;
    return isOdd && lastOne;
  };

  return (
    <Row align={align} gutter={gutter}>
      {items.map((Item, index) => (
        <Col
          key={index}
          xs={{ flex: "100%" }}
          md={{ flex: isLastItemOddIndex(index) ? "100%" : "50%" }}
          lg={{ flex: `${mapSpanPercents[index] || defaultFlexPercent}%` }}
        >
          {typeof Item === "function" ? <Item /> : Item}
        </Col>
      ))}
    </Row>
  );
};
