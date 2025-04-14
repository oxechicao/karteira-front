import React from "react";
import { Create } from "@refinedev/antd";
import { FormKarteira } from "@modules/karteira/components/FormKarteira";

export const CreateKarteiraPage: React.FC = () => {
  return (
    <Create resource="karteiras">
      <FormKarteira />
    </Create>
  );
};
