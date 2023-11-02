import { Values } from "../types/AgendamentosProvider";
const BASEURL = 'http://localhost:3001';

//faz o registro/criação do agendamento no banco de dados
export const fetchAPi = async (values: Values) => {
  const eventId = await fetchAPiGoogleEvent(values)
  values.eventId = eventId
  const { agendamentos, ...newValues } = values;

  const response = (await fetch(`${BASEURL}/registre`, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newValues)
  }
  ));

  const data = await response.json();
  
  return data;
}

//faz o login do usuário e retorna o token
export const fetchAPiLogin = async (email: string, password: string) => {
  const response = (await fetch(`${BASEURL}/login`, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  }
  ));
  
  const data = await response.json();
  
  return data;
}

//faz a busca dos agendamentos no banco de dados de acordo com a data
export const fetchAPiGet = async (date: string | null) => {
  const formattedDate = date?.replace(/\//g, '-');
  const response = (await fetch(`${BASEURL}/schedules/${formattedDate}`, {
    method: 'get',
    headers: { 'Content-Type': 'application/json' },
  }
  ));

  const data = await response.json();
  
  return data
}

export const fetchAPiGetId = async (date: string | null, hour: string | number) => {
  const formattedDate = date?.replace(/\//g, '-');

  const response = (await fetch(`${BASEURL}/schedules/${formattedDate}/${hour}`, {
    method: 'get',
    headers: { 'Content-Type': 'application/json' },
  }
  ));

  const data = await response.json();

  return data.eventId;
}

//conta quantos agendamentos foram realizados de acorodo com o intervalo de dias passado, é necessario passar o token
export const fetchAPiCount = async (days: number, token: string) => {
  const response = (await fetch(`${BASEURL}/schedules/${days}`, {
    method: 'get',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
  }
  ));

  const data = await response.json();
  
  return data;
}

//realiza o cancelamento de um agendamento de acordo com a data e a hora do agendamento
export const fetchAPiCancel = async (dateonly: string, hour: string | number) => {
   (await fetch(`${BASEURL}/cancellation`, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ dateonly, hour })
  }
  ));

}

//conta quantos cancelamentos foram realizados de acorodo com o intervalo de dias passado, é necessario passar o token
export const fetchAPiCountCancel = async (days: number, token: string) => {
  const response = (await fetch(`${BASEURL}/cancellation/${days}`, {
    method: 'get',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
  }
  ));

  const data = await response.json();
  
  return data;
}

export const fetchAPiGoogleEvent = async (values: Values) => {
  const response = (await fetch(`${BASEURL}/googleEvent`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values)
  }));

  const data = await response.json();
  return data.event.id
}

export const fetchAPiGoogleEventDelete = async (eventId: string) => {
 (await fetch(`${BASEURL}/googleEvent/${eventId}`, {
      method: 'delete',
      headers: { 'Content-Type': 'application/json' },
  }));
  
}