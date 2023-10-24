# Normalização do Banco de Dados

## Tabela de Usuários

- user_id (Chave Primária)
- name (Nome do usuário)
- phone (Número de telefone)

## Tabela de Serviços

- service_id (Chave Primária)
- service (Nome do serviço)
- price (Preço do serviço)
- duration (duração do serviço)

## Tabela de Agendamentos

- Schedule_id (Chave Primária)
- user_id (Chave Estrangeira referenciando a tabela de Usuários)
- date (Data do agendamento)
- hour (Hora do agendamento)

## Tabela de Agendamentos_Serviços (Tabela de Junção)
- id 
- schedule_id (Chave Estrangeira referenciando a tabela de Agendamentos)
- service_id (Chave Estrangeira referenciando a tabela de Serviços)

## Tabela de Cancelamentos
- cancel_id (Chave Primária)
- user_id (Chave Estrangeira referenciando a tabela de Usuários)
- schedule_service_id (Chave Estrangeira referenciando a tabela de Agendamentos_Serviços)
- cancel_date (Data/hora do cancelamento)
