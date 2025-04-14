import React from "react";
import { Edit } from "@refinedev/antd";
import { FormKarteira } from "@modules/karteira/components/FormKarteira";

export const EditKarteiraPage: React.FC = () => {
  return (
    <Edit resource="karteiras">
      <FormKarteira />
    </Edit>
  );
};
