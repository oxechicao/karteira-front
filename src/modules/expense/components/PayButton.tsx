"use client";

import {
  Button,
  Popconfirm,
  type ButtonProps,
  type PopconfirmProps,
} from "antd";
import { useNotification } from "@refinedev/core";
import React from "react";
import { WalletOutlined } from "@ant-design/icons";

import { payExpense } from "@modules/expense/services/payExpense";

type PayButtonProps = {
  expenseId: string;
  onlyButton?: boolean;
  onClick?: (e: any) => void;
};

export const PayButton: React.FC<PayButtonProps> = (props) => {
  const { expenseId, onlyButton, onClick } = props;
  const { open } = useNotification();
  const onConfirm: PopconfirmProps["onConfirm"] = async (e) => {
    e?.preventDefault();
    await payExpense(expenseId, []);
    open?.({
      type: "success",
      description: "Scesso",
      message: `Conta paga com sucesso`,
    });
  };

  const buttonProps: ButtonProps = {
    variant: "solid",
    icon: <WalletOutlined />,
    color: "green",
  };

  if (onlyButton) {
    return (
      <Button {...buttonProps} onClick={onClick}>
        Pagar
      </Button>
    );
  }

  return (
    <Popconfirm
      title="Confirmar pagamento"
      description="Deseja registar o pagamento?"
      okText="Sim"
      cancelText="Não"
      onConfirm={onConfirm}
    >
      <Button {...buttonProps}>Pagar</Button>
    </Popconfirm>
  );
};
