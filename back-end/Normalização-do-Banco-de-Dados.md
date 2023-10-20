# Normalização do Banco de Dados

## Tabela de Usuários

- user_id (Chave Primária)
- name (Nome do usuário)
- phone (Número de telefone)

## Tabela de Serviços

- service_id (Chave Primária)
- service (Nome do serviço)
- price (Preço do serviço)

## Tabela de Agendamentos

- Schedule_id (Chave Primária)
- user_id (Chave Estrangeira referenciando a tabela de Usuários)
- date (Data do agendamento)
- hour (Hora do agendamento)
- service_id (Chave Estrangeira referenciando a tabela de Serviços)
