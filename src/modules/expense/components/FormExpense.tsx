"use client";

import FormExpenseModel from "@modules/expenseTemplates/components/FormExpenseModel/FormExpenseModel";
import mapFormExpenseEditing from "@modules/expenseTemplates/helpers/mapFormExpenseEditing";
import ExpenseTemplateModelForm from "@modules/expenseTemplates/models/ExpenseTemplateModelForm";
import { ExpenseTemplateDocument } from "@modules/expenseTemplates/schemas/ExpenseTemplateSchema";
import { useList, useNotification } from "@refinedev/core";
import { Checkbox, Col, Divider, Form, Input, Row, Select } from "antd";
import { useEffect, useMemo } from "react";

export default function FormExpense() {
  const form = Form.useFormInstance();
  const templateId = Form.useWatch<string>(["templateId"], { form });
  const shouldCreateNewTemplate = Form.useWatch<boolean>(
    ["shouldCreateNewTemplate"],
    { form },
  );

  const { open, close } = useNotification();

  const { data, isLoading } = useList<ExpenseTemplateDocument>({
    resource: "tipos",
  });

  const options = useMemo(() => {
    if (isLoading || !data?.data) return [];

    return data.data.map((item: ExpenseTemplateDocument) => ({
      label: item.templateName,
      value: item._id,
    }));
  }, [data, isLoading]);

  useEffect(() => {
    if (!templateId) return;

    const selectedTemplate = data?.data.find(
      (item: ExpenseTemplateDocument) => item._id === templateId,
    );

    if (!selectedTemplate) return;
    form.setFieldsValue({
      ...mapFormExpenseEditing(
        selectedTemplate.template as ExpenseTemplateModelForm,
      ),
    });

    open?.({
      type: "success",
      description: "Formulário alterado com sucesso",
      message: `Tipo de despesa foi alterado para: ${selectedTemplate.templateName}`,
      key: `template-changes-notification-${templateId}`,
    });

    setTimeout(() => {
      close?.(`template-changes-notification-${templateId}`);
    }, 3000);
  }, [templateId, form, data, open, close]);

  return (
    <>
      <Divider orientation="left"> Tipo de Despesas</Divider>
      <Row>
        <Col xs={24} md={6} lg={5} xl={3}>
          <Form.Item
            key="shouldCreateNewTemplate"
            label="Criar novo modelo?"
            name="shouldCreateNewTemplate"
          >
            <Checkbox
              onChange={(e) =>
                form.setFieldValue("shouldCreateNewTemplate", e.target.checked)
              }
            />
          </Form.Item>
        </Col>
        <Col xs={24} md={18} lg={19} xl={21}>
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
      <FormExpenseModel />
    </>
  );
}
