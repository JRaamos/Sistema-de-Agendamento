# Bem-vindo ao Back-end do Projeto Sistema de Agendamento

Aqui, você encontrará os detalhes de como todo o back-end do projeto Sistema de Agendamento está estruturado:
- **Tecnologias utilizadas**
- **Normalização do banco de dados**
- **Rotas e métodos de acesso**

## Tecnologias utilizadas

Neste projeto, essas foram as principais tecnologias e ferramentas utilizadas no desenvolvimento e testes:

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

### Ambiente de execução
- **Node.js**

## Normalização do Banco de Dados

<details>
  <summary><strong>Tabelas e suas associações</strong></summary>
  
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
