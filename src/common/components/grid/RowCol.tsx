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
  const sumSpanSizes = Object.values(spanSizes || {}).reduce(
    (a, c) => a + c,
    0,
  );

  const lengthSpanSizes = Object.keys(spanSizes || {}).length;
  const firstItemWithoutSpan = items.findIndex(
    (_, index) => spanSizes && spanSizes[index] === undefined,
  );

  const avgSpanSize = !defaultWidth ? Math.floor(24 / items.length) : 0;
  const countSpanDefault = items.length - lengthSpanSizes;

  const defaultSpanSize =
    Math.floor(
      (24 - (avgSpanSize * countSpanDefault + sumSpanSizes)) / countSpanDefault,
    ) + avgSpanSize;

  const diff = 24 - (sumSpanSizes + defaultSpanSize * countSpanDefault);
  return (
    <Row align={align} gutter={gutter}>
      {items.map((Item, index) => (
        <Col
          key={index}
          span={
            spanSizes && spanSizes[index] !== undefined
              ? spanSizes[index]
              : index === firstItemWithoutSpan
                ? defaultSpanSize + diff
                : defaultSpanSize
          }
        >
          {typeof Item === "function" ? <Item /> : Item}
        </Col>
      ))}
    </Row>
  );
};
