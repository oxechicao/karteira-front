"use client";

import React, { useEffect, useMemo } from "react";
import { Checkbox, Col, Divider, Form, Input, Row, Select } from "antd";
import { ExpenseForm } from "@modules/expense/models/ExpenseForm";
import { useList, useNotification } from "@refinedev/core";
import { mapFormEditExpenseTemplate as mapFormExpenseEditing } from "@modules/expense-template/mappers/mapFormEditExpenseTemplate";
import { ExpenseTemplateModelSchema } from "@modules/expense-template/schemas/ExpenseTemplateModelSchema";
import { mapExpenseTemplateToExpenseForm } from "@modules/expense/mappers/mapExpenseTemplateToExpenseForm";

export const FormTemplateExpense: React.FC = () => {
  const { open } = useNotification();

  const { data, isLoading } = useList<ExpenseTemplateModelSchema>({
    resource: "contas",
  });

  const form = Form.useFormInstance<ExpenseForm>();
  const templateId = Form.useWatch<string>(["templateId"], { form });
  const shouldCreateNewTemplate = Form.useWatch<boolean>(
    ["shouldCreateNewTemplate"],
    { form },
  );

  const expenseTemplateList: ExpenseTemplateModelSchema[] = useMemo(() => {
    return data?.data || [];
  }, [data]);

  const options = useMemo(() => {
    if (!expenseTemplateList) return [];

    return expenseTemplateList.map((item: ExpenseTemplateModelSchema) => ({
      label: item.templateName,
      value: item._id,
    }));
  }, [expenseTemplateList]);

  useEffect(() => {
    if (!templateId) return;

    const selectedTemplate = data?.data.find(
      (item: ExpenseTemplateModelSchema) => item._id === templateId,
    );

    console.log(selectedTemplate);

    if (!selectedTemplate) return;
    form.setFieldsValue({
      ...mapExpenseTemplateToExpenseForm(selectedTemplate),
    });

    open?.({
      type: "success",
      description: "Formulário alterado com sucesso",
      message: `Tipo de despesa foi alterado para: ${selectedTemplate.templateName}`,
      key: `template-changes-notification-${templateId}`,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [templateId]);

  return (
    <>
      <Divider orientation="left"> Tipo de Despesas</Divider>
      <Row>
        <Col xs={24} md={6} lg={5} xl={4}>
          <Form.Item
            key="shouldCreateNewTemplate"
            label="Criar novo modelo?"
            name="shouldCreateNewTemplate"
            valuePropName="checked"
          >
            <Checkbox
              onChange={(e) =>
                form.setFieldValue("shouldCreateNewTemplate", e.target.checked)
              }
            />
          </Form.Item>
        </Col>
        <Col xs={24} md={18} lg={19} xl={20}>
          {shouldCreateNewTemplate ? (
            <Form.Item
              key="templateName"
              name="templateName"
              label="Nome do novo tipo de despesa"
              required={shouldCreateNewTemplate}
            >
              <Input />
            </Form.Item>
          ) : (
            <Form.Item
              key="templateid"
              label="Tipo de despesa"
              name="templateId"
              required={shouldCreateNewTemplate}
            >
              <Select allowClear loading={isLoading} options={options} />
            </Form.Item>
          )}
        </Col>
      </Row>
    </>
  );
};
