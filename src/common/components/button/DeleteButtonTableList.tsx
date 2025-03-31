import { DeleteOutlined } from "@ant-design/icons";
import { DeleteButton } from "@refinedev/antd";

type DeletButtonTableListProps = {
  id: string;
  title?: string;
  resource: string;
};

export default function DeletButtonTableList({
  id,
  title,
  resource,
}: DeletButtonTableListProps) {
  return (
    <DeleteButton
      icon={<DeleteOutlined />}
      resource={resource}
      recordItemId={id}
      confirmTitle={title || "Tem certeza que deseja excluir?"}
      key="button-delete"
      color="danger"
      variant="solid"
      confirmOkText="Sim"
      confirmCancelText="Não"
    >
      Excluir
    </DeleteButton>
  );
}
