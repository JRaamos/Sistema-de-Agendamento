# Bem-vindo ao Back-end do Projeto Sistema de Agendamento

Aqui, você encontrará os detalhes de como todo o back-end do projeto Sistema de Agendamento está estruturado:
- **Tecnologias utilizadas**
- **Normalização do banco de dados**
- **Rotas e métodos de acesso**

## Tecnologias utilizadas

Neste projeto, as principais tecnologias e ferramentas utilizadas no desenvolvimento e testes são:

### Linguagem de Programação
- **TypeScript**
  
### Banco de Dados
- **MySQL** 

### Principais Bibliotecas

- **Express.js**
- **Sequelize**
- **JSON Web Tokens**
- **Bcryptjs**
- **Mocha**

### APIs Externas

- **Google Calendar API**

### Ambiente de execução
- **Node.js**

## Normalização do Banco de Dados

<details>
  <summary><strong>Tabelas e suas associações</strong></summary>summary>
  
- **Tabela de Usuários**

  - `Nome da Tabela`: **'users'**
  - `user_id` (Chave Primária)
  - `name` (Nome do usuário)
  - `phone` (Número de telefone)

- **Tabela de Serviços**

  - `Nome da Tabela`: **'services'**
  - `service_id` (Chave Primária)
  - `service` (Nome do serviço)
  - `price` (Preço do serviço)
  - `duration` (Duração do serviço)

- **Tabela de Agendamentos**

  - `Nome da Tabela`: **'schedules'**
  - `schedule_id` (Chave Primária)
  - `user_id` (Chave Estrangeira referenciando a tabela de Usuários)
  - `date` (Data do agendamento)
  - `hour` (Hora do agendamento)

- **Tabela de Agendamentos_Serviços (Tabela de Junção)**

  - `Nome da Tabela`: **'schedule_services'**
  - `id`
  - `schedule_id` (Chave Estrangeira referenciando a tabela de Agendamentos)
  - `service_id` (Chave Estrangeira referenciando a tabela de Serviços)

- **Tabela de Cancelamentos**

  - `Nome da Tabela`: **'cancellations'**
  - `cancellation_id` (Chave Primária)
  - `user_id` (Chave Estrangeira referenciando a tabela de Usuários)
  - `schedule_id` (Chave Estrangeira referenciando a tabela de Agendamentos_Serviços)
  - `dateSchedule` (Data que seria o agendamento)

- **Tabela de Barbeiros**

  - `Nome da Tabela`: **'barber_users'**
  - `barber_id` (Chave Primária)
  - `name` (Nome do barbeiro)
  - `email` (E-mail de login do barbeiro)
  - `password` (Senha de login do barbeiro)
</details>

## Rotas e métodos de acesso

### Login para Barbeiros

- **Rota:** POST `/login` 

Rota para autenticação de login e quando sucesso retorna um token JWT

### Registre

- **Rota:** POST `/registre`

  Cria um novo agendamento e adiciona os serviços solicitados para este agendamento. Também cria um novo usuário se o telefone fornecido não existir no banco de dados.

#### Parâmetros do Corpo (Body Parameters)

- `name` (string): Nome do cliente.
- `phone` (string): Número de telefone do cliente.
- `date` (string): Data do agendamento.
- `hour` (string): Hora do agendamento.
- `services` (array): Lista dos serviços solicitados.

#### Respostas

- `200 OK`: Retorna um objeto contendo informações sobre o usuário e o agendamento criado.

  ```json
  {
    "user": {
      // detalhes do usuário
    },
    "scheduleResult": {
      // detalhes do agendamento
    }
  }


### Schedules

- **Rota:** GET `/schedules/:date`

Rota para pegar **todos** os agendamentos realizados em uma **data especifica**, 
nessa rota é incluido todos os serviços que foram/serão realizados nessa data especifica

- **Rota:** GET `/schedules/:date/:hour`

Rota para pegar **UM** agentamento em uma **data e hora especifica**, nessa rota é 
incluido todos os serviços que foram/serão realizados nesse agendameto

- **Rota:** GET `/schedules/:intervalDays`
  
Rota para contar quantos agendamentos foram realizados de acordo com o intervalo de dias que é passado 

### Cancellations

- **Rota:** POST `/cancellation`

  Cancela um agendamento existente e adiciona os detalhes do cancelamento no banco de dados.

#### Parâmetros do Corpo (Body Parameters)

- `dateonly` (string): Data do agendamento que será cancelado.
- `hour` (string): Hora do agendamento que será cancelado.

#### Respostas

- `200 OK`: A solicitação foi bem-sucedida e o agendamento foi cancelado.
  
- `404 Not Found`: Retorna uma mensagem de erro se o agendamento não for encontrado.

  ```json
  "Schedule not found"


### Google Calendar Agendamento

- **Rota:** POST `/googleEvent`

Cria um novo evento de agendamento no Google Calendar utilizando os dados de agendamento do sistema.

#### Parâmetros do Corpo (Body Parameters)

- `date` (string): Data do agendamento no formato MM/DD/YYYY.
- `hour` (string): Hora do agendamento no formato HH:MM.
- `name` (string): Nome do cliente.
- `phone` (string): Número de telefone do cliente.
- `services` (array): Lista dos serviços solicitados.

#### Respostas

- `200 OK`: Retorna um objeto contendo informações sobre o evento criado no Google Calendar.

  ```json
  {
    "message": "Evento criado com sucesso!",
    "event": {
      // detalhes do evento
    }
  }
