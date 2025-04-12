"use client";

import { TableExpense } from "@modules/expense/components/TableExpense";
import { List, useTable } from "@refinedev/antd";
import { useState } from "react";
import { FormPaymentModal } from "@modules/expense/components/FormPaymentModal";
import { ExpenseListTable } from "@modules/expense/models/ExpenseListTable";

export function ListExpensePage() {
  const [openPaymentModal, setOpenPaymentModal] = useState<boolean>(false);
  const [currentId, setCurrentId] = useState<string>("");

  const setupPaymentModal = (id: string) => {
    setCurrentId(id);
    setOpenPaymentModal(true);
  };

  const { tableProps } = useTable<ExpenseListTable>({
    syncWithLocation: true,
  });

  return (
    <>
      <List
        resource="despesas"
        title="Lista de Despesas"
        createButtonProps={{
          children: "Novo",
        }}
      >
        <TableExpense
          tableProps={tableProps}
          openPaymentModal={setupPaymentModal}
        />
      </List>
      <FormPaymentModal
        isOpen={openPaymentModal}
        handleClose={() => {
          setOpenPaymentModal(false);
          setCurrentId("");
        }}
        expenseId={currentId}
      />
    </>
  );
}
