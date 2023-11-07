
const mensagensInicial = {
  mensagem01: `Olá, tudo bem? Sou a assistente virtual
   do barbeiro CHUCA e cuido do agendamento dos serviços dele, blz?`,
  mensagem02: 'Por favor, me informe seu nome e sobrenome.',
  mensagem03: (name: string) => `Seja bem vindo ${name} a Stylus Barbearia`,
  mensagem04: 'Selecione o(os) serviço(os) que deseja agendar e clique em enviar.',
  mensagem05: 'Blz, e qual o melhor dia e horário para você ser atendido?',
  mensagem06: `Me informe seu numero de telefone, por favor com o DDD.`,
  mensagem07: 'Perfeito ... Tudo certo',
  mensagem08: (service: string, date: string) => `Agendamento realizado com sucesso! Um(a) ${service}, com o barbeiro CHUCA no(a), ${date}`,
  mensagem09: 'Muito obrigado, até mais!',
  mensagem10: (name: string) => `Olá ${name}, Seja Bem vindo de volta!`,
};
export default mensagensInicial;
