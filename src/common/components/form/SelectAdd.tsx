import { PlusOutlined } from "@ant-design/icons";
import { Button, Divider, InputRef, Select, Space } from "antd";
import Input from "rc-input";
import { useRef, useState } from "react";

type Options = {
  label: string;
  value: string;
};

export type SelectAddProps = {
  defaultOptions?: Options[];
  addButtonLabel: string;
};

export const SelectAdd: React.FC<SelectAddProps> = ({
  defaultOptions,
  addButtonLabel,
}) => {
  const [items, setItems] = useState<Options[]>(defaultOptions || []);
  const [name, setName] = useState("");
  const inputRef = useRef<InputRef>(null);

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const addItem = (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>,
  ) => {
    e.preventDefault();

    if (!name) return;

    setItems([
      ...items,
      { label: name, value: name.trim().replace(/\b/g, "-").toLowerCase() },
    ]);

    setName("");
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  return (
    <Select
      dropdownRender={(menu) => (
        <>
          {menu}
          <Divider style={{ margin: "8px 0" }} />
          <Space style={{ padding: "0 8px 4px" }}>
            <Input
              placeholder="Novo item na lista"
              ref={inputRef}
              value={name}
              onChange={onNameChange}
              onKeyDown={(e) => e.stopPropagation()}
            />
            <Button type="text" icon={<PlusOutlined />} onClick={addItem}>
              {addButtonLabel}
            </Button>
          </Space>
        </>
      )}
      options={items.map((item) => ({ label: item.label, value: item.value }))}
    />
  );
};
