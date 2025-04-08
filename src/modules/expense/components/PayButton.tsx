"use client";

import { Button, Popconfirm, type PopconfirmProps } from "antd";
import { payExpense } from "@modules/expense/features/pay/payExpense.service";
import { useNotification } from "@refinedev/core";
import React from "react";
import { WalletOutlined } from "@ant-design/icons";

type PayButtonProps = {
  expenseId: string;
};

export const PayButton: React.FC<PayButtonProps> = (props) => {
  const { expenseId } = props;
  const { open } = useNotification();
  const onConfirm: PopconfirmProps["onConfirm"] = async (e) => {
    console.log(e);
    e?.preventDefault();
    await payExpense(expenseId);
    open?.({
      type: "success",
      description: "Scesso",
      message: `Conta paga com sucesso`,
    });
  };
  return (
    <Popconfirm
      title="Confirmar pagamento"
      description="Deseja registar o pagamento?"
      okText="Sim"
      cancelText="Não"
      onConfirm={onConfirm}
    >
      <Button variant="solid" icon={<WalletOutlined />} color="green">
        Pagar
      </Button>
    </Popconfirm>
  );
};
