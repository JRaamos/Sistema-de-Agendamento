import {  format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";

export function convertDateFormat(dateStr: string): string {
  // Separa a string de data por traço em vez de barras
  const [year, month, day] = dateStr.split('-'); // Desestruturação para pegar ano, mês e dia

  // A linha a seguir é uma segurança caso o split não funcione como esperado,
  // evitando o retorno de "undefined/undefined/data"
  if (!year || !month || !day) {
    console.error('Formato de data inválido:', dateStr);
    return dateStr; // ou você pode retornar um valor padrão ou lançar um erro.
  }

  return `${day}/${month}/${year}`; // Reorganiza no formato DD/MM/YYYY
}

// Função para converter a data de "yyyy/mm/dd" para "mm/dd/yyyy"
export function convertToMMDDYYYY(dateString: string) {
  // Primeiro verifica se a string da data está no formato esperado
  const parts = dateString.split("-");
  if (parts.length === 3) {
    const [year, month, day] = parts;
    return `${month}/${day}/${year}`;
  } else {
    // Retorna algum valor padrão ou mensagem de erro se o formato não for o esperado
    console.error("Formato de data inválido:", dateString);
    return "Data Inválida";
  }
}
 
export const newDateConvert = () => {
  const currentDateTime = new Date();
  const year = currentDateTime.getFullYear();
  const month = currentDateTime.getMonth() + 1;
  const day = currentDateTime.getDate();

  // Formata a data como 'yyyy/mm/dd'
  // Usa 'padStart' para garantir que o mês e o dia sejam sempre dois dígitos
  const formattedDate = `${year}/${month.toString().padStart(2, '0')}/${day.toString().padStart(2, '0')}`;

  return formattedDate;
}

export const dateConvert = (date: Date) => {
  const formattedDate = format(date, "dd/MM/yyy", {
    locale: ptBR,
  });

  return formattedDate;
}