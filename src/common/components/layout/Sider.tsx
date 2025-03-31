"use client";

import {
  BarChartOutlined,
  PaperClipOutlined,
  PayCircleFilled,
} from "@ant-design/icons";
import { useGo } from "@refinedev/core";
import { Layout, Menu } from "antd";

export const Sider: React.FC = () => {
  const go = useGo();

  const onClick = ({ key }: { key: string }) => {
    go({
      to: {
        resource: key,
        action: "list",
      },
    });
  };

  return (
    <Layout.Sider trigger={null}>
      <div className="demo-logo-vertical" />
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["1"]}
        items={[
          { key: "painel", icon: <BarChartOutlined />, label: "Paineis" },
          { key: "despesas", icon: <PayCircleFilled />, label: "Despesas" },
          { key: "tipos", icon: <PaperClipOutlined />, label: "Tipos" },
        ]}
        onClick={onClick}
      />
    </Layout.Sider>
  );
};
