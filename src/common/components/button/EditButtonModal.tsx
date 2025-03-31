import { EditOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React from "react";

type EditButtonModal = {
  id: string;
  openModal: (id: string) => void;
};

export default function EditButtonModal({ id, openModal }: EditButtonModal) {
  return (
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
}
