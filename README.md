# Sistema-de-Agendamento

## Visão Geral do Projeto

O projeto Barbearia - Stilus é um aplicativo full stack desenvolvido para facilitar o agendamento de serviços em uma barbearia. Ele permite que os clientes reservem horários para cortes de cabelo, barbas e outros serviços oferecidos pela barbearia de forma conveniente.

### Tecnologias Utilizadas

#### Front-End
No desenvolvimento do front-end, as seguintes tecnologias e ferramentas foram empregadas:

- **`React`**: Para a construção da interface de usuário.
- **`TypeScript`**: Como linguagem de programação para adicionar tipagem estática.
- **`Vite`**: Como ferramenta de build e desenvolvimento.
- **`React Router`**: Para o gerenciamento de rotas na aplicação.
- **`Chart.js e React Chartjs 2`**: Para a criação de gráficos.
- **`FullCalendar`**: Para a implementação de funcionalidades de calendário.
- **`Moment.js e Date-fns`**: Para manipulação de datas e horários.
- **`Google Calendar API`**: Para integração com o Google Calendar.
- **`Eslint e Stylelint`**: Para garantir a qualidade e consistência do código.


#### Back-End
No desenvolvimento do back-end, as seguintes tecnologias e ferramentas foram empregadas:

- **`TypeScript`**: Como linguagem de programação para adicionar tipagem estática.
- **`MySQL`**: Para o gerenciamento do banco de dados.
- **`Express.js`**: Como framework para criar a aplicação server-side.
- **`Sequelize`**: Como ORM para facilitar a interação com o banco de dados.
- **`JSON Web Tokens`**: Para autenticação e gerenciamento de sessões.
- **`Bcryptjs`**: Para a criptografia de senhas.
- **`Mocha`**: Para a realização de testes.
- **`Google Calendar API`**: Para integração com o Google Calendar.
- **`Node.js`**: Como ambiente de execução.


## Configuração e Uso

Siga estas instruções para configurar o projeto em seu ambiente local:

### Front-End

1. Navegue até a pasta `frontend` no diretório raiz do projeto.
2. Execute `npm install` para instalar as dependências do projeto.
3. Para iniciar o servidor de desenvolvimento, execute `npm run dev`.
4. Para executar os testes, utilize o comando `npm test`.

### Back-End

1. Navegue até a pasta `backend` no diretório raiz do projeto.
2. Execute `npm install` para instalar as dependências do projeto.
3. Configure as variáveis de ambiente necessárias, como informações de conexão com o banco de dados.
4. Inicie o servidor usando o comando `npm start`.
5. Para executar os testes, utilize o comando `npm test`.

## Arquitetura

O projeto segue uma arquitetura cliente-servidor, onde o front-end interage com o back-end por meio de API RESTful. A estrutura do banco de dados é gerenciada pelo Sequelize, facilitando a criação e consulta de agendamentos de serviço.

## Funcionalidades Principais

- Agendamento de serviços por data e horário.
- Visualização dos horários disponíveis para agendamento.
- Cancelamento de agendamentos.
- Gerenciamento de serviços oferecidos.
- Area de Dashboard para os proficionais
- Graficos informativos
- Possibilidade de adicionar ou retirar horarios, e folgas

### Estrutura de Diretórios do Back-end

- `src/controllers/`: Contém os controladores que gerenciam a lógica de negócios e as interações com o banco de dados.
- `src/database/models/`: Inclui os modelos do Sequelize, representando as tabelas do banco de dados.
- `src/database/migrations/`: Armazena as migrações do Sequelize para gerenciar as alterações na estrutura do banco de dados.
- `src/database/seeders/`: Contém os seeders para popular o banco de dados com dados iniciais.
- `src/services/`: Serviços que encapsulam a lógica de negócios e interações com os modelos.
- `src/middlewares/`: Middlewares para funções intermediárias, como autenticação e validação.
- `src/utils/`: Funções utilitárias, incluindo auxiliares para JWT e outras funcionalidades comuns.
- `src/routers/`: Define as rotas da aplicação, mapeando URLs para os controladores.
- `src/types/`: Tipos e interfaces TypeScript personalizados para o projeto.
- `src/tests/`: Testes para o projeto, incluindo mocks e testes unitários.



### Estrutura de Diretórios do Frontend

- `src/components/`: Contém componentes React reutilizáveis.
- `src/pages/`: Inclui as páginas da aplicação, cada uma representando uma tela diferente.
- `src/context/`: Armazena os contextos React para gerenciamento de estado global.
- `src/styles/`: Contém arquivos CSS para estilização dos componentes e páginas.
- `src/types/`: Definições de tipos TypeScript para o projeto.
- `src/utils/`: Funções utilitárias para uso em todo o projeto.

## Contribuição

Se deseja contribuir para o projeto, siga estas etapas:

1. Faça um fork do repositório.
2. Crie uma branch para a sua funcionalidade (`git checkout -b minha-funcionalidade`).
3. Faça commit das suas mudanças (`git commit -m 'Adiciona minha funcionalidade'`).
4. Faça um push para a branch (`git push origin minha-funcionalidade`).
5. Abra um pull request no GitHub.

## Licença

Este projeto está sob a licença MIT. Consulte o arquivo [LICENSE](LICENSE) para obter mais detalhes.

## Contato

Para dúvidas ou informações adicionais, entre em contato com a equipe de desenvolvimento em jhonyramos46@gmail.com.
