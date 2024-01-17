// eslint-disable-next-line import/prefer-default-export
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
