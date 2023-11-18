# Bem-vindo ao Back-end do Projeto Sistema de Agendamento

Aqui, você encontrará os detalhes de como todo o back-end do projeto Sistema de Agendamento está estruturado:

- **Tecnologias utilizadas**
- **Normalização do banco de dados**
- **Rotas e métodos de acesso**

## Tecnologias utilizadas

Neste projeto, as principais tecnologias e ferramentas utilizadas no desenvolvimento e testes são:

- **`TypeScript`**: Como linguagem de programação para adicionar tipagem estática.
- **`MySQL`**: Para o gerenciamento do banco de dados.
- **`Express.js`**: Como framework para criar a aplicação server-side.
- **`Sequelize`**: Como ORM para facilitar a interação com o banco de dados.
- **`JSON Web Tokens`**: Para autenticação e gerenciamento de sessões.
- **`Bcryptjs`**: Para a criptografia de senhas.
- **`Mocha`**: Para a realização de testes.
- **`Google Calendar API`**: Para integração com o Google Calendar.
- **`Node.js`**: Como ambiente de execução.


## Normalização do Banco de Dados

<details>
  <summary><strong>Tabelas e suas associações</strong></summary>
  
- **Tabela de Usuários**

  - `Nome da Tabela`: **'users'**
  - `user_id` (Chave Primária)
  - `name` (Nome do usuário)
  - `phone` (Número de telefone)
  - `device_id` (id para notificação push)

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

- **Tabela de dias de folga**
  - `Npme da tablea`: **'day_off'**
  - `day_off_id` (Chave Primária) 
  - `barber_id` (Id do barbeiro)
  - `day_off` (Data da folga)
  - `time` (Periodo da folga)
  </details>

## Rotas e métodos de acesso

### Login para Barbeiros

- **Rota:** POST `/login`

  Autentica o login do barbeiro e, em caso de sucesso, retorna um token JWT.

#### Parâmetros do Corpo (Body Parameters)

- `email` (string): E-mail do barbeiro.
- `password` (string): Senha do barbeiro.

  #### Respostas

- `200 OK`: Retorna um objeto contendo o token JWT e outras informações relacionadas ao usuário.

  ```json
  {
    "token": "your-jwt-token"
  }
  ```

### Registre

- **Rota:** POST `/registre`

  Cria um novo agendamento e adiciona os serviços solicitados para este agendamento. Também cria um novo usuário se o telefone fornecido não existir no banco de dados.

#### Parâmetros do Corpo (Body Parameters)

- `name` (string): Nome do cliente.
- `phone` (string): Número de telefone do cliente.
- `date` (string): Data do agendamento.
- `hour` (string): Hora do agendamento.
- `services` (array): Lista dos serviços solicitados.
- `device_id` (id para notificação push)


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
  ```

### Schedules (formato da data `YYYY-MM-DD`)
- **Rota** GET `/schedules`
  
  Rota para pegar **todos os agentamentos** que ainda vão ser realizado aparti da **data e hora atual** para frente 
  #### Respostas 

- `200 OK`: Retorna um **array de objetos** contendo todas as informações dos agendamentos incluido serviços e cliente 
  
  ```json
  [
    {
      "scheduleId": 13,
      "date": "2023-11-13",
      "hour": "07:00",
      "eventId": "2j0lb1c25vhrb99f8msuo987p4",
      "userId": 13,
      "services": [
        {
          "service": "Corte na máquina",
          "price": "20",
          "duration": "30"
        }
      ],
      "user": {
      "name": "xablau",
      "phone": "(11) 91111-1111",
      "deviceId": "00000000-111111asdasd-sadwasdkmasd-ksj32"
      }
    },
  //... outros objetos
  ]
  ```

- **Rota:** GET `/schedules/date/:date`

  Rota para pegar **todos** os agendamentos realizados em uma **data especifica**,
  nessa rota é incluido todos os serviços que foram/serão realizados nessa data especifica.

    #### Respostas 

- `200 OK`: Retorna um um array de objetos contendo as informações dos agendamentos daquele dia
  ```json
  [
    {
      "scheduleId": 13,
      "date": "2023-11-13",
      "hour": "07:00",
      "eventId": "2j0lb1c25vhrb99f8msuo987p4",
      "userId": 13,
      "services": [
        {
          "service": "Corte na máquina",
          "price": "20",
          "duration": "30"
        }
      ],
     "user": {
      "name": "xablau",
      "phone": "(11) 91111-1111",
      "deviceId": "00000000-111111asdasd-sadwasdkmasd-ksj32"
      }
    },
  //... outros objetos
  ]
  ```

- **Rota:** GET `/schedules/date/:date/hour/:hour`

  Rota para pegar **UM** agendamento em uma **data e hora especifica**, nessa rota é
  incluido todos os serviços que foram/serão realizados nesse agendamento.

  #### Respostas 

- `200 OK`: Retorna um **objeto** com as informações do a gendamento especifico so com os serviços, sem o cliente.

  ```json
  {
    "scheduleId": 13,
    "date": "2023-11-13",
    "hour": "07:00",
    "eventId": "2j0lb1c25vhrb99f8msuo987p4",
    "userId": 13,
    "services": [
      {
        "service": "Corte na máquina",
        "price": "20",
        "duration": "30"
      }
    ],
  }
  ```


- **Rota** GET `/schedules/count/future`

  Rota para contar quantos agendamentos ainda serão realizados a parti da data e hora atual. 

  #### Respostas 

 - `200 OK`: Restorna um **objeto** com a quantidade de agendamentos futuros. 
    ```json 
    {
      "result": 8
    } 
    ```

- **Rota:** GET `/schedules/count/:intervalDays`

  Rota para contar quantos agendamentos foram realizados de acordo com o intervalo de dias que é passado.

  #### Respostas 

- `200 OK`: Restona um **objeto** com a quantidade e de agendamentos ja realizados.
  ```json
  {
  "result": 1
  }
  ```
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
  ```
- **Rota** GET `/cancellation/:intervalDays`
  Conta quantos cancelamentos ja tiveram de acordo com a quantidade de dias passado, para retorna todos os cancelamentos o parametro tem de ser **0**.

#### Respostas 

- `200 OK`: Retorna um objeto contendo a quatidade de cancelamentos.

  ```json
  {
    "result": 6
  }
  ``` 

### Google Calendar

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
  ```


- **Rota:** DELETE `/googleEvent/:eventId`

  Deleta um evento existente no Google Calendar.


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

### dayOff
- **Rota** GET `/dayOff`

  Verifica quais são os dias de folga e qual tipo de folga, sendo somente pela manhã, somente pela tarde, ou o dia todo.

#### Respostas

- `200 OK`: retorna um **array de objetos** com os dias de folga e o tipo e qual barbeiro esta de folga.
  
  ```json
  [
    {
      "dayOffId": 22,
      "barberId": 1,
      "dayOff": "2024-04-02",
      "time": "full-day"
    },
    //... outros objetos
  ]
  ```

- **Rota** POST `dayOff`
  
   Cria dia de folga

#### Parâmetros do Corpo (Body Parameters)

  - `selectedDate` (string): Data da folga no formato YYYY-MM-DD.
  - `timeOff` (strinf): Tipo de folga,sendo full-day,morning,afternoon 

#### Respostas

- `200 OK`: Retorna mensangem de sucesso na criação de um agendamento.

  ```json
  {
    "message": "Folga Criada com Sucesso"
  }
  ```

- **Rota** DELETE `/dayOff/:date`

  Deleta dia de folga

#### Respostas 

- `200 OK`: Retorna mensagem de sucesso ao deletar dia de folga
  
  ```json
  {
     "message": "Folga deletada com Sucesso" 
  }
  ```
