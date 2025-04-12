export function formatValueSchema(value: string): number {
  return Number(String(value).replace(/\D/g, ""));
}
