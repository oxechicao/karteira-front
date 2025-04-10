"use client";

import FormExpenseModel from "@modules/expense-template/components/FormExpenseModel/FormExpenseModel";
import { mapFormExpenseTemplateEditing as mapFormExpenseEditing } from "@modules/expense-template/expense-template.mapper";
import { ExpenseTemplateDocument } from "@modules/expense-template/expense-template.schema";
import { useList, useNotification } from "@refinedev/core";
import { Checkbox, Col, Divider, Form, Input, Row, Select } from "antd";
import { useEffect, useMemo } from "react";
import { ExpenseTemplateModelForm } from "@modules/expense-template/expenseTemplate.type";

export default function FormExpense() {
  const form = Form.useFormInstance();
  const templateId = Form.useWatch<string>(["templateId"], { form });
  const shouldCreateNewTemplate = Form.useWatch<boolean>(
    ["shouldCreateNewTemplate"],
    { form },
  );

  const { open } = useNotification();

  const { data, isLoading } = useList<ExpenseTemplateDocument>({
    resource: "contas",
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
      <FormExpenseModel />
    </>
  );
}
