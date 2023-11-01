import { Values } from "../types/AgendamentosProvider";
const BASEURL = 'http://localhost:3001';

//faz o registro/criação do agendamento no banco de dados
export const fetchAPi = async (values: Values) => {
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

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 551d17e (feat: adiciona consultas as rotas disponiveis no front e adiciona codigo para cancelamento e liberação do horario no banco de dados)
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
<<<<<<< HEAD
export const fetchAPiGet = async (date: string | null) => {
  const formattedDate = date?.replace(/\//g, '-');
  const response = (await fetch(`${BASEURL}/schedules/${formattedDate}`, {
    method: 'get',
    headers: { 'Content-Type': 'application/json' },
=======
=======
>>>>>>> 551d17e (feat: adiciona consultas as rotas disponiveis no front e adiciona codigo para cancelamento e liberação do horario no banco de dados)
export const fetchAPiGet = async (date: string | null) => {
  const formattedDate = date?.replace(/\//g, '-');
  const response = (await fetch(`${BASEURL}/schedules/${formattedDate}`, {
    method: 'get',
    headers: { 'Content-Type': 'application/json' },
>>>>>>> 464bdf3 (fix: ajusta maneira de renderizar horarios disponiveis para corrigir bug de conflito com horario)
  }
  ));

  const data = await response.json();
  
  return data;
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