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

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
- **Rota:** POST `/login` 
=======
<<<<<<< HEAD
- **Rota:** POST `/login`
=======
- **Rota:** POST `/login` 
>>>>>>> 551d17e (feat: adiciona consultas as rotas disponiveis no front e adiciona codigo para cancelamento e liberação do horario no banco de dados)
>>>>>>> f262c3f (feat:)

<<<<<<< HEAD
Rota para autenticação de login e quando sucesso retorna um token JWT
=======
=======
=======
>>>>>>> 1705a86 (feat: adiciona consultas as rotas disponiveis no front e adiciona codigo para cancelamento e liberação do horario no banco de dados)
- **Rota:** POST `/login`
=======
- **Rota:** POST `/login` 
>>>>>>> 551d17e (feat: adiciona consultas as rotas disponiveis no front e adiciona codigo para cancelamento e liberação do horario no banco de dados)

<<<<<<< HEAD
>>>>>>> f351c7c (fix: ajus documentação do back-end para incluir mais detalhes as rotas que usam metodo posto e incluir o uso de uma API externa)
=======
<<<<<<< HEAD
=======
<<<<<<< HEAD
Rota para autenticação de login e quando sucesso retorna um token JWT
=======
>>>>>>> dc29f94 (feat: adiciona rota para deletar um evento no Google calendar)
>>>>>>> 44fc261 (feat: adiciona rota para deletar um evento no Google calendar)
  Autentica o login do barbeiro e, em caso de sucesso, retorna um token JWT.

#### Parâmetros do Corpo (Body Parameters)

- `email` (string): E-mail do barbeiro.
- `password` (string): Senha do barbeiro.

#### Respostas

- `200 OK`: Retorna um objeto contendo o token JWT e outras informações relacionadas ao usuário.

  ```json
  {
<<<<<<< HEAD
<<<<<<< HEAD
    "token": "your-jwt-token"
    // outras informações do usuário
  }
  ```
<<<<<<< HEAD
>>>>>>> bf2a463 (feat: adiciona rota para deletar um evento no Google calendar)
=======
    "token": "your-jwt-token",
    // outras informações do usuário
  }
>>>>>>> f351c7c (fix: ajus documentação do back-end para incluir mais detalhes as rotas que usam metodo posto e incluir o uso de uma API externa)
=======
    "token": "your-jwt-token"
    // outras informações do usuário
  }
  ```
>>>>>>> bf2a463 (feat: adiciona rota para deletar um evento no Google calendar)
=======
<<<<<<< HEAD
=======
>>>>>>> bf2a463 (feat: adiciona rota para deletar um evento no Google calendar)
>>>>>>> dc29f94 (feat: adiciona rota para deletar um evento no Google calendar)
>>>>>>> 44fc261 (feat: adiciona rota para deletar um evento no Google calendar)

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
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
  ```
=======

>>>>>>> f351c7c (fix: ajus documentação do back-end para incluir mais detalhes as rotas que usam metodo posto e incluir o uso de uma API externa)
=======
  ```
>>>>>>> bf2a463 (feat: adiciona rota para deletar um evento no Google calendar)
=======
=======
>>>>>>> 44fc261 (feat: adiciona rota para deletar um evento no Google calendar)
  ```
=======

>>>>>>> e84dfcb (fix: ajus documentação do back-end para incluir mais detalhes as rotas que usam metodo posto e incluir o uso de uma API externa)
<<<<<<< HEAD
>>>>>>> 8f050e3 (fix: ajus documentação do back-end para incluir mais detalhes as rotas que usam metodo posto e incluir o uso de uma API externa)
=======
=======
  ```
>>>>>>> dc29f94 (feat: adiciona rota para deletar um evento no Google calendar)
>>>>>>> 44fc261 (feat: adiciona rota para deletar um evento no Google calendar)

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
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
  
>>>>>>> f351c7c (fix: ajus documentação do back-end para incluir mais detalhes as rotas que usam metodo posto e incluir o uso de uma API externa)
=======
>>>>>>> bf2a463 (feat: adiciona rota para deletar um evento no Google calendar)
=======
=======
  
>>>>>>> e84dfcb (fix: ajus documentação do back-end para incluir mais detalhes as rotas que usam metodo posto e incluir o uso de uma API externa)
>>>>>>> 8f050e3 (fix: ajus documentação do back-end para incluir mais detalhes as rotas que usam metodo posto e incluir o uso de uma API externa)
=======
=======
  
>>>>>>> e84dfcb (fix: ajus documentação do back-end para incluir mais detalhes as rotas que usam metodo posto e incluir o uso de uma API externa)
=======
>>>>>>> dc29f94 (feat: adiciona rota para deletar um evento no Google calendar)
>>>>>>> 44fc261 (feat: adiciona rota para deletar um evento no Google calendar)
- `404 Not Found`: Retorna uma mensagem de erro se o agendamento não for encontrado.

  ```json
  "Schedule not found"
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 8f050e3 (fix: ajus documentação do back-end para incluir mais detalhes as rotas que usam metodo posto e incluir o uso de uma API externa)
=======
>>>>>>> 44fc261 (feat: adiciona rota para deletar um evento no Google calendar)
  ```

### Google Calendar
=======


### Google Calendar Agendamento
<<<<<<< HEAD
>>>>>>> f351c7c (fix: ajus documentação do back-end para incluir mais detalhes as rotas que usam metodo posto e incluir o uso de uma API externa)
=======
  ```

### Google Calendar
>>>>>>> bf2a463 (feat: adiciona rota para deletar um evento no Google calendar)
=======
>>>>>>> e84dfcb (fix: ajus documentação do back-end para incluir mais detalhes as rotas que usam metodo posto e incluir o uso de uma API externa)
<<<<<<< HEAD
>>>>>>> 8f050e3 (fix: ajus documentação do back-end para incluir mais detalhes as rotas que usam metodo posto e incluir o uso de uma API externa)
=======
=======
  ```

### Google Calendar
>>>>>>> dc29f94 (feat: adiciona rota para deletar um evento no Google calendar)
>>>>>>> 44fc261 (feat: adiciona rota para deletar um evento no Google calendar)

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
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> bf2a463 (feat: adiciona rota para deletar um evento no Google calendar)
=======
>>>>>>> 8f050e3 (fix: ajus documentação do back-end para incluir mais detalhes as rotas que usam metodo posto e incluir o uso de uma API externa)
=======
=======
>>>>>>> dc29f94 (feat: adiciona rota para deletar um evento no Google calendar)
>>>>>>> 44fc261 (feat: adiciona rota para deletar um evento no Google calendar)
  ```


- **Rota:** DELETE `/googleEvent/:eventId`

Deleta um evento existente no Google Calendar.

#### Parâmetros de Rota (Route Parameters)

- `eventId` (string): ID do evento no Google Calendar que será deletado.

#### Respostas

- `200 OK`: Retorna um objeto contendo uma mensagem de sucesso.

  ```json
  {
    "message": "Evento deletado com sucesso!",
    "event": {
      // detalhes do evento deletado
    }
  }
  ```
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> f351c7c (fix: ajus documentação do back-end para incluir mais detalhes as rotas que usam metodo posto e incluir o uso de uma API externa)
=======
>>>>>>> bf2a463 (feat: adiciona rota para deletar um evento no Google calendar)
=======
=======
>>>>>>> e84dfcb (fix: ajus documentação do back-end para incluir mais detalhes as rotas que usam metodo posto e incluir o uso de uma API externa)
>>>>>>> 8f050e3 (fix: ajus documentação do back-end para incluir mais detalhes as rotas que usam metodo posto e incluir o uso de uma API externa)
=======
=======
>>>>>>> e84dfcb (fix: ajus documentação do back-end para incluir mais detalhes as rotas que usam metodo posto e incluir o uso de uma API externa)
=======
>>>>>>> dc29f94 (feat: adiciona rota para deletar um evento no Google calendar)
>>>>>>> 44fc261 (feat: adiciona rota para deletar um evento no Google calendar)
