# Sistema-de-Agendamento

## Visão Geral do Projeto

O projeto Barbearia - Stilus é um aplicativo full stack desenvolvido para facilitar o agendamento de serviços em uma barbearia. Ele permite que os clientes reservem horários para cortes de cabelo, barbas e outros serviços oferecidos pela barbearia de forma conveniente.

### Tecnologias Utilizadas

#### Front-End
- TypeScript
- Vite (Bundler)
- Jest (Framework de Testes)

#### Back-End
- Sequelize (ORM para Banco de Dados)
- Mocha (Framework de Testes)
- Node.js

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

- Cadastro de clientes e barbeiros.
- Agendamento de serviços por data e horário.
- Visualização dos horários disponíveis para agendamento.
- Cancelamento de agendamentos.
- Gerenciamento de serviços oferecidos.

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

Para dúvidas ou informações adicionais, entre em contato com a equipe de desenvolvimento em [jhonyramos46@gmail.com].

