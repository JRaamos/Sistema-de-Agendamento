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
  const response = (await fetch('http://localhost:3001/schedules', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ date })
  }
  ));

  const data = await response.json();
  
  return data;
}

