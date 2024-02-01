import { DayOff, Values } from "../types/AgendamentosProvider";
import { FetchAPi, FetchAPiGet, FetchAPiLogin, ServiceApi } from "../types/ApiReturn";

const BASEURL = 'https://sistema-de-agendamento-production.up.railway.app';
// const BASEURL = 'http://localhost:3001';
//faz o registro/criação do agendamento no banco de dados
export const fetchAPi = async (values: Values): Promise<FetchAPi> => {
  const deviceId = localStorage.getItem('deviceId')
  const eventId = await fetchAPiGoogleEvent(values)
  values.eventId = eventId
  values.deviceId = deviceId
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
export const fetchAPiLogin = async (email: string, password: string): Promise<FetchAPiLogin> => {
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
export const fetchAPiGet = async (date: string | null): Promise<FetchAPiGet[]> => {
  const formattedDate = date?.replace(/\//g, '-');
  const response = (await fetch(`${BASEURL}/schedules/date/${formattedDate}`, {
    method: 'get',
    headers: { 'Content-Type': 'application/json' },
  }
  ));

  const data = await response.json();
  if (data.message) {
    throw new Error(data.message)
  }

  return data.data;
}

export const fetchAPiGetAll = async (): Promise<FetchAPiGet[]> => {
  const response = (await fetch(`${BASEURL}/schedules`, {
    method: 'get',
    headers: { 'Content-Type': 'application/json' },
  }
  ));

  const data = await response.json();

  return data.data
}

export const fetchAPiGetId = async (date: string | null, hour: string | number) => {
  const formattedDate = date?.replace(/\//g, '-');

  const response = (await fetch(`${BASEURL}/schedules/date/${formattedDate}/hour/${hour}`, {
    method: 'get',
    headers: { 'Content-Type': 'application/json' },
  }
  ));

  const data = await response.json();

  return data;
}

//conta quantos agendamentos foram realizados de acorodo com o intervalo de dias passado, é necessario passar o token
export const fetchAPiCount = async (days: number | string, token: string | null) => {
  const response = (await fetch(`${BASEURL}/schedules/count/${days}`, {
    method: 'get',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
  }
  ));

  const data = await response.json();

  return data;
}

//conta quantos agendamentos futuros foram realizados, é necessario passar o token
export const fetchAPiCountFuture = async (token: string | null) => {
  const response = (await fetch(`${BASEURL}/schedules/count/future`, {
    method: 'get',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
  }));

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
export const fetchAPiCountCancel = async (days: number, token: string | null) => {
  const response = (await fetch(`${BASEURL}/cancellation/count/${days}`, {
    method: 'get',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
  }
  ));

  const data = await response.json();

  return data;
}

export const fetchAPiCancellDate = async (date: string) => {
  const formattedDate = date?.replace(/\//g, '-');

  const response = (await fetch(`${BASEURL}/cancellation/date/${formattedDate}`, {
    method: 'get',
    headers: { 'Content-Type': 'application/json' },
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

export const fetchApiCreateDayOff = async (dayOff: DayOff[], token: string | null) => {
  const response = (await fetch(`${BASEURL}/dayOff`, {
    method: 'post',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
    body: JSON.stringify(dayOff)
  }))
  const data = await response.json();
  return data.message;
}

type DayOffDb = {
  dayOffId: number;
  barberId: number;
  dayOff: Date;
  time: number;
}

export const fetchApiGetDayOff = async () => {
  const response = await fetch(`${BASEURL}/dayOff`, {
    method: 'get',
    headers: { 'Content-Type': 'application/json' },
  });
  const data = await response.json();

  const newData = data.map((item: DayOffDb) => {
    // Adiciona função para converter a data
    const convertedDate = convertDateFormat(item.dayOff.toString());

    return {
      selectedDate: convertedDate,
      timeOff: item.time,
    };
  });


  return newData;
}

// Função auxiliar para converter o formato da data
function convertDateFormat(dateStr: string): string {
  // Separa a string de data por traço em vez de barras
  const [year, month, day] = dateStr.split('-'); // Desestruturação para pegar ano, mês e dia

  // A linha a seguir é uma segurança caso o split não funcione como esperado,
  // evitando o retorno de "undefined/undefined/data"
  if (!year || !month || !day) {
    console.error('Formato de data inválido:', dateStr);
    return dateStr; // ou você pode retornar um valor padrão ou lançar um erro.
  }

  return `${month}/${day}/${year}`; // Reorganiza no formato MM/DD/YYYY
}

export const fetchApiDeleteDayOff = async (date: string, token: string | null) => {
  const formattedDate = date?.replace(/\//g, '-');

  const response = (await fetch(`${BASEURL}/dayOff/${formattedDate}`, {
    method: 'delete',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },

  }))
  const data = await response.json();
  return data.message;
}

export const fetchApiServiceUpdate = async (name: string, service: Partial<ServiceApi>, token: string | null,) => {
  const response = (await fetch(`${BASEURL}/service/${name}`, {
    method: 'put',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
    body: JSON.stringify(service)
  }))
  const data = await response.json();
  return data.message;
}

export const fetchAPiGetAllServices = async (): Promise<ServiceApi[]> => {
  const response = (await fetch(`${BASEURL}/services`, {
    method: 'get',
    headers: { 'Content-Type': 'application/json' },
  }
  ));

  const data = await response.json();

  return data
}