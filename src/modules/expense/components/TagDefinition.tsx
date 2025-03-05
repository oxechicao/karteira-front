import { DefinitionsTag } from "@modules/expense/models/ExpenseModel";
import { Tag } from "antd";

export const expenseDefinitionLabel: Record<DefinitionsTag, string> = {
  form: "Forma",
  type: "Tipo",
  source: "Fonte",
  category: "Categoria",
  itau: "Itaú",
  nubank: "Nubank",
  inter: "Inter",
  irmao: "Irmão",
  casa: "Casa",
  fastfood: "Fast Food",
  lore: "Baby Lore",
  chicao: "Baby Chicones",
  pessoal: "Pessoal",
  mercado: "Mercado",
  farmacia: "Farmácia",
  saude: "Saúde",
  pet: "Pet",
  eventos: "Eventos",
  viagem: "Viagem",
  transporte: "Transporte",
  streaming: "Streaming",
  vestuario: "Vesturário",
  educação: "Educação",
  jogos: "Jogos",
  reservas: "Reservas",
  etc: "Etc",
  credit: "Crédito",
  installment: "Parcelado",
  debit: "Pix/Débito",
  planning: "Planejamento/Reserva",
  monthly: "Mensal",
  yearly: "Anual",
  weekly: "Semanal",
};

type TagDefinitionProps = {
  value: DefinitionsTag;
};
export const TagDefinition: React.FC<TagDefinitionProps> = ({ value }) => {
  return <Tag>{expenseDefinitionLabel[value] || value}</Tag>;
};
