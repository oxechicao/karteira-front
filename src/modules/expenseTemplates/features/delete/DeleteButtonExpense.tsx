import { DeleteOutlined } from "@ant-design/icons";
import { DeleteButton } from "@refinedev/antd";
import React from "react";

type DeleteButtonExpenseProps = {
  id: string;
};

const DeleteButtonExpense: React.FC<DeleteButtonExpenseProps> = ({ id }) => (
  <DeleteButton
    key="button-delete"
    color="danger"
    variant="solid"
    icon={<DeleteOutlined />}
    resource="tipos"
    recordItemId={id}
    confirmTitle="Tem certeza que deseja excluir modelo de despesa?"
    confirmOkText="Sim"
    confirmCancelText="Não"
  >
    Excluir
  </DeleteButton>
);

export default DeleteButtonExpense;
