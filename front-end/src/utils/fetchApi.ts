import { Values } from "../types/AgendamentosProvider";

export const fetchAPi = async (values: Values) => {
  const { agendamentos, ...newValues } = values;

  const response = (await fetch('http://localhost:3001/registre', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newValues)
  }
  ));

  const data = await response.json();
  
  return data;
}

export const fetchAPiGet = async (date: string | null) => {
  const formattedDate = date?.replace(/\//g, '-');
  const response = (await fetch(`http://localhost:3001/schedules/${formattedDate}`, {
    method: 'get',
    headers: { 'Content-Type': 'application/json' },
  }
  ));

  const data = await response.json();
  
  return data;
}

