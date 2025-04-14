"use client";

import {
  BankOutlined,
  BarChartOutlined,
  PayCircleFilled,
  WalletOutlined,
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
          { key: "karteiras", icon: <WalletOutlined />, label: "Karteiras" },
          { key: "contas", icon: <BankOutlined />, label: "Contas" },
          { key: "despesas", icon: <PayCircleFilled />, label: "Despesas" },
        ]}
        onClick={onClick}
      />
    </Layout.Sider>
  );
};
