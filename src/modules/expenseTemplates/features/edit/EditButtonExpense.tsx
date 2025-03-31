import { EditOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React from "react";

type EditButtonExpenseProps = {
  id: string;
  openModal: (id: string) => void;
};

const EditButtonExpense: React.FC<EditButtonExpenseProps> = ({
  id,
  openModal,
}) => (
  <Button
    key="button-edit"
    color="gold"
    variant="solid"
    icon={<EditOutlined />}
    onClick={() => {
      openModal(id);
    }}
  >
    Editar
  </Button>
);

export default EditButtonExpense;
