export function formatFormValueToExpenseSchemaValue(value: string): number {
  return Number(String(value).replace(/\D/g, ""));
}
