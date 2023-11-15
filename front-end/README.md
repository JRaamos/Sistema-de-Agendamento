# Bem-vindo ao Front-end do Projeto Sistema de Agendamento

Este documento fornece uma visão geral da estrutura e das tecnologias utilizadas no front-end do Sistema de Agendamento. Aqui, você encontrará informações sobre:

- **Tecnologias Utilizadas**
- **Estrutura do Projeto**
- **Componentes Principais**
- **Páginas da Aplicação**
- **Estilos e Design**
- **Instruções de Instalação e Execução**

## Tecnologias Utilizadas

No desenvolvimento do front-end, as seguintes tecnologias e ferramentas foram empregadas:

- **React**: Para a construção da interface de usuário.
- **TypeScript**: Como linguagem de programação para adicionar tipagem estática.
- **Vite**: Como ferramenta de build e desenvolvimento.
- **React Router**: Para o gerenciamento de rotas na aplicação.
- **Chart.js e React Chartjs 2**: Para a criação de gráficos.
- **FullCalendar**: Para a implementação de funcionalidades de calendário.
- **Moment.js e Date-fns**: Para manipulação de datas e horários.
- **Google Calendar API**: Para integração com o Google Calendar.
- **Eslint e Stylelint**: Para garantir a qualidade e consistência do código.

## Estrutura do Projeto

O projeto está organizado da seguinte forma:

- `src/components/`: Contém componentes React reutilizáveis.
- `src/pages/`: Inclui as páginas da aplicação, cada uma representando uma tela diferente.
- `src/context/`: Armazena os contextos React para gerenciamento de estado global.
- `src/styles/`: Contém arquivos CSS para estilização dos componentes e páginas.
- `src/types/`: Definições de tipos TypeScript para o projeto.
- `src/utils/`: Funções utilitárias para uso em todo o projeto.

## Componentes Principais
- `Services`

  Componente responsavel por renderizar todos os serviços que são realizados pelo barbeiro, incluindo o tempo e o preço de cada serviço

- `AppointmentTimes`

  Componente responsavel por renderizar todos os horarios disponiveis ou não, ele verifica a disponibilidade do barbeiro para o um dia especifico, faz a filtragem para nao ter nem um conflito de horario, alem disso todos os horarios são renderizados de acorodo com a quantidade de tempo total dos serviços escolhidos.
  
## Páginas da Aplicação

### `Página Home`

A página Home é a página inicial do aplicativo e oferece uma interface amigável e intuitiva para os usuários. Ela contém várias funcionalidades chave:

- **Navegação para Login**: Um link que direciona o usuário para a página de login.
- **Menu de Navegação**: Um menu interativo que se expande e retrai, oferecendo uma experiência de usuário responsiva e adaptável a diferentes tamanhos de tela.
- **Escolha de Barbeiro para Agendamento**: Uma seção dedicada onde o usuário pode escolher um barbeiro para realizar um agendamento. Isso é feito através de um link que leva à página de agendamentos.
- **Contexto de Agendamentos**: Utiliza o contexto de agendamentos para gerenciar estados relacionados aos agendamentos.
- **Design Responsivo**: A página é projetada para ser responsiva, adaptando-se a diferentes tamanhos de tela e dispositivos.
- **Rodapé com Direitos Autorais**: Um rodapé que exibe os direitos autorais, destacando a propriedade intelectual do desenvolvedor.

Esta página serve como ponto de partida para a navegação no aplicativo, oferecendo um acesso rápido e eficiente às principais funcionalidades.

### `Página de Login`

A página de Login é essencial para o controle de acesso ao aplicativo. Ela apresenta várias características e funcionalidades importantes:

- **Navegação de Retorno**: Um botão que permite ao usuário retornar à página inicial.
- **Logo**: Exibe o logo do aplicativo, mantendo a consistência visual.
- **Formulário de Login**: Um formulário que permite ao usuário inserir suas credenciais de login (email e senha).
- **Mensagem de Erro**: Exibe mensagens de erro para o usuário em caso de falha no login.
- **Exibição de Senha**: Permite ao usuário alternar entre mostrar e ocultar a senha digitada para maior segurança.
- **Botão de Login**: Um botão para submeter as credenciais e tentar o login.
- **Integração com API**: Utiliza a função `fetchAPiLogin` para autenticar o usuário.
- **Navegação Pós-Login**: Redireciona o usuário para a página do painel do barbeiro após um login bem-sucedido.
- **Loading**: Exibe um componente de carregamento enquanto a autenticação está em andamento.
- **Rodapé com Direitos Autorais**: Um rodapé que exibe os direitos autorais, reforçando a propriedade intelectual do desenvolvedor.

Esta página é projetada para ser simples e intuitiva, garantindo uma experiência de usuário fluida e segura durante o processo de login.

### `Página Barber Dashboard`

A página Barber Dashboard é uma interface central para o barbeiro gerenciar suas atividades após o login. Ela oferece várias funcionalidades e seções:

- **Menu de Navegação**: Um menu lateral que pode ser expandido ou recolhido, contendo opções para navegar entre diferentes seções do dashboard.
- **Troca de Abas**: Permite ao usuário alternar entre diferentes abas como "Informações", "Agendar cliente", "Agendar folga" e "Agendamentos".
- **Logout**: Uma opção para sair da conta, removendo o token de autenticação e redirecionando para a página de login.
- **Gráfico de Agendamentos**: Na aba "Informações", é exibido um gráfico com os agendamentos, proporcionando uma visão geral das atividades.
- **Agendamento de Clientes e Folgas**: Permite ao barbeiro agendar clientes ou definir dias de folga.
- **Visualização de Agendamentos**: Na aba "Agendamentos", o barbeiro pode visualizar todos os agendamentos marcados.
- **Integração com Contexto de Agendamentos**: Utiliza o contexto `AgendamentosContext` para gerenciar estados relacionados a agendamentos e folgas.
- **Fetch API para Dias de Folga**: Utiliza a função `fetchApiGetDayOff` para obter informações sobre os dias de folga.
- **Responsividade do Menu**: O menu lateral pode ser expandido ou recolhido, adaptando-se a diferentes tamanhos de tela.

Esta página é projetada para ser uma central de controle para o barbeiro, permitindo gerenciar facilmente agendamentos, clientes e suas próprias folgas, tudo em um único lugar.

### `Página de Agendamentos`

A página de Agendamentos é a principal interface para os clientes agendarem serviços com o barbeiro escolhido. Ela oferece uma série de funcionalidades interativas e intuitivas:

- **Navegação e Introdução**: Inicialmente, se o nome do cliente não estiver armazenado, a página exibe uma introdução. Caso contrário, o cliente é saudado com uma mensagem de boas-vindas.
- **Seleção de Serviços**: O cliente pode selecionar os serviços desejados. Após a seleção, os serviços escolhidos são exibidos para confirmação.
- **Escolha da Data**: Uma vez selecionados os serviços, o cliente pode escolher a data do agendamento através de um calendário interativo.
- **Seleção de Horário**: Após escolher a data, são apresentados os horários disponíveis para agendamento.
- **Confirmação do Agendamento**: O cliente pode confirmar o agendamento, fornecendo informações adicionais como número de telefone.
- **Visualização e Gerenciamento de Agendamentos**: O cliente tem a opção de visualizar e gerenciar seus agendamentos existentes.
- **Contexto de Agendamentos**: A página utiliza o `AgendamentosContext` para gerenciar estados e informações relacionadas aos agendamentos.
- **Responsividade e Navegação Intuitiva**: A página é projetada para ser responsiva e fácil de navegar, com botões e seções claramente identificáveis.

Esta página é essencial para a experiência do cliente, permitindo-lhe escolher serviços, datas e horários de forma simples e eficiente, além de gerenciar seus agendamentos existentes.

### `Página Meus Agendamentos`

A página "Meus Agendamentos" é uma interface crucial para os clientes visualizarem e gerenciarem seus agendamentos atuais. Ela oferece várias funcionalidades:

- **Visualização de Agendamentos Atuais**: Os clientes podem ver todos os seus agendamentos futuros. Os agendamentos são filtrados para excluir aqueles que já passaram.
- **Formatação de Data e Hora**: As datas e horas dos agendamentos são formatadas para o padrão local (pt-BR), facilitando a compreensão por parte dos clientes.
- **Cálculo de Preços**: O preço total de cada agendamento é calculado com base nos serviços selecionados.
- **Cancelamento de Agendamentos**: Os clientes têm a opção de cancelar agendamentos. Um aviso é exibido informando sobre a política de cancelamento (por exemplo, cancelamentos permitidos com no mínimo 30 minutos de antecedência).
- **Interação com APIs Externas**: Ao cancelar um agendamento, a aplicação interage com APIs externas para remover o evento do Google Calendar e atualizar o banco de dados.
- **Atualização Dinâmica**: A lista de agendamentos é atualizada dinamicamente após um cancelamento.
- **Navegação Intuitiva**: A página possui um botão para retornar à página de agendamentos e um design claro e responsivo.

Essa página é essencial para proporcionar aos clientes controle total sobre seus agendamentos, permitindo-lhes planejar e ajustar suas visitas de acordo com suas necessidades.
