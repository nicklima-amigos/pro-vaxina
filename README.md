# Pro-Vaxina

A empresa Pro-Vaxina foi contratada pela prefeitura da cidade de Salvador para desenvolver um software onde será feito o controle de vacinação da cidade, em busca de reduzir os grandes aumentos de casos de Dengue, Febre Amarela, Covid-19, entre outros. Para isso, a prefeitura requisitou à empresa Pro-Vaxina que o software possua os seguintes modelos de classe:

- **Paciente:** onde serão requisitados de todos os cidadãos seus nomes completos, CPF e data de aniversário.
- **Vacina:** onde serão registradas por modelo, fabricante e doença.
- **Registro da vacinação:** sendo esta onde será feita uma tabela no banco referenciando a um paciente na tabela de pacientes e a uma vacina na tabela de vacinas, além de sua data de aplicação.

## Responsáveis pelo Projeto

- Adailton Lima - 1272219962
- Caio Lucius - 12722117059
- Raphael Oliveira - 1272211685
- Manoel Duran - 1272214667
- Eduardo Barbosa - 1272216524

## Índice

1. [Especificação de Requisitos](#requisitos)
2. [Planejamento](#planejamento)
3. [Configuração do Ambiente de DevOps](#devops)
4. [Especificação de testes](#testes)
5. [Conclusões](#conclusão)

# Requisitos

### Requisitos Funcionais

**RF1: Gerenciar Vacinas**

- _Atores:_ Usuários
- _Descrição:_ Acesso completo para criar, atualizar e remover vacinas.
- _Prioridade:_ Alto

**RF2: Gerenciar Pacientes**

- _Atores:_ Usuários
- _Descrição:_ Acesso completo para criar, atualizar e remover pacientes.
- _Prioridade:_ Alto

**RF3: Gerenciar Registro de Vacinação**

- _Atores:_ Usuários
- _Descrição:_ Acesso completo para atualizar e remover registros de vacinação.
- _Prioridade:_ Alto

**RF4: Consultar registros de vacinação por paciente**

- _Atores:_ Funcionário do posto de saúde
- _Descrição:_ Consultar e visualizar todas as vacinas aplicadas para um paciente específico, com detalhes sobre data, vacina e profissional.
- _Prioridade:_ Alto

**RF5: Consultar vacinas disponíveis**

- _Atores:_ Funcionário do posto de saúde
- _Descrição:_ Consultar e visualizar todas as vacinas cadastradas no sistema, com detalhes sobre nome, fabricante e doença associada.
- _Prioridade:_ Alto

**RF6: Consultar Registro de Aplicações de Vacina por Data**

- _Atores:_ Funcionário do posto de saúde
- _Descrição:_ Consultar e visualizar todas as vacinas aplicadas durante um período específico, com detalhes sobre paciente, vacina e profissional.
- _Prioridade:_ Alto

**RF7: Consultar registro de Aplicações de Vacina por Paciente**

- _Atores:_ Funcionário do posto de saúde
- _Descrição:_ Consultar e visualizar todas as vacinas aplicadas para um paciente ao longo do tempo.
- _Prioridade:_ Alto

### Requisitos Não Funcionais

**RNF1: Segurança**

- _Descrição:_ Dados do paciente devem ser armazenados de forma segura.
- _Prioridade:_ Alta

**RNF2: Segurança**

- _Descrição:_ O sistema deve ter métodos de prevenção de erros. Por exemplo: Confirmação de exclusão de dados.
- _Prioridade:_ Alta

**RNF3: Desempenho**

- _Descrição:_ Tempo de resposta das requisições deve ser satisfatório.
- _Prioridade:_ Alta

**RNF4: Usabilidade**

- _Descrição:_ Interface de usuário deve ter um fluxo intuitivo.
- _Prioridade:_ Alta

**RNF5: Integração e Entrega Contínua**

- _Descrição:_ O projeto deve ter verificação de testes automatizados ao ser feita qualquer alteração e garantir uma entrega contínua.
- _Prioridade:_ Alta

# Planejamento

Para o desenvolvimento do projeto, será adotado o modelo de trabalho utilizando a ferramenta ClickUp para organização e gerenciamento de tarefas, com o front-end e back-end integrados em um mono repositório. Isso permitirá uma gestão mais eficiente das tarefas e uma melhor integração entre as equipes de desenvolvimento. As tarefas serão divididas de acordo com as funcionalidades a serem implementadas, como gerenciamento de vacinas, pacientes e registro de vacinação, e priorizadas com base na sua importância e no cronograma do projeto.
Cada tarefa será atribuída a um membro da equipe responsável por sua implementação, garantindo uma distribuição equitativa das responsabilidades.

O progresso das tarefas será acompanhado de perto através do ClickUp, com atualizações regulares durante reuniões de acompanhamento. Além disso, serão implementadas práticas de integração contínua utilizando o GitHub Actions, garantindo testes automatizados e implantação contínua do código. Será também adotado o Husky/Commit Lint para garantir a consistência e padronização dos commits no repositório.

A metodologia ágil Kanban será utilizada para organizar e visualizar o fluxo de trabalho, permitindo uma abordagem iterativa e incremental para o desenvolvimento do projeto. O Kanban permitirá que a equipe visualize o progresso das tarefas, identifique gargalos e faça ajustes conforme necessário para maximizar a eficiência e a entrega de valor ao cliente.

O acompanhamento das tarefas será realizado de forma transparente e colaborativa, com atualizações em tempo real no ClickUp e feedback constante entre os membros da equipe. Com essas práticas de trabalho, espera-se garantir um desenvolvimento ágil, eficiente e de alta qualidade do software, cumprindo os requisitos estabelecidos e entregando um produto final que atenda às necessidades e expectativas dos usuários.

# Devops

### GitHub Actions

- _O que são Github Actions_

  GitHub Actions são uma ferramenta de automação que permite automatizar tarefas dentro do fluxo de trabalho de um repositório no GitHub. As GitHub Actions permitem a criação de fluxos de trabalho personalizados para automatizar tarefas específicas dentro do ciclo de vida de um projeto. Essas tarefas podem incluir a construção (build), teste, empacotamento, implantação (deploy), notificações e qualquer outra atividade desejável. Isso ajuda a automatizar processos repetitivos e a integrar várias ferramentas diretamente a um fluxo de trabalho de desenvolvimento.

- _Configurando Github Actions_

  Passo a passo de uma configuração de uma Git Action:

  1. Criar um arquivo YAML para o workflow, como o exemplo a seguir:
     ###################################################################
     name: CI

  on:
  push:
  branches: - main

  jobs:
  build:
  runs-on: ubuntu-latest

        steps:
        - name: Checkout repository
            uses: actions/checkout@v2bn

        - name: Run a script
        run: |
        echo "Hello, world!"

  ###################################################################
  Neste exemplo:

  _name:_ CI Define o nome do fluxo de trabalho como "CI".

  _on:_ Especifica os eventos que acionarão o fluxo de trabalho. Neste caso, o fluxo de trabalho será acionado em um push para a branch main.

  _jobs:_ Define os trabalhos que serão executados no fluxo de trabalho. Aqui, temos um trabalho chamado build.

  _runs-on:_ Especifica o ambiente em que o trabalho será executado. No exemplo, estamos usando o ambiente ubuntu-latest.

  _steps:_ Define as etapas (ações) a serem executadas no trabalho. No exemplo, estamos fazendo o checkout do repositório e executando um script simples que imprime "Hello, world!".

  2. Fazer o Commit e o Push do arquivo YAML para o repositório no GitHub.

  3. Verificar a execução da Action:

Depois de fazer o push do arquivo YAML, conferir na aba "Actions" do repositório. O Workflow deve estar listado lá. Neste exemplo, ao ocorrer um push para a branch main, a Action será acionada e os status e os logs da execução estarão na interface do GitHub para verificações.

### CI/CD

- _Integração Contínua (CI)_
  A Integração Contínua consiste em integrar o código de diferentes membros da equipe em um repositório compartilhado com frequência e de forma automatizada. O objetivo é detectar e corrigir problemas de integração o mais cedo possível, evitando conflitos e erros que podem surgir quando várias pessoas estão trabalhando no mesmo código. Suas principais características são:

  _Automatização:_ Utilização de ferramentas e scripts para automatizar o processo de integração.

  _Build Automático:_ Compilação automática do código para garantir que ele esteja funcionando corretamente.

  _Execução de Testes:_ Execução automatizada de testes unitários, de integração e outros testes relevantes.

  _Feedback Rápido:_ Feedback imediato sobre a qualidade do código integrado, permitindo correções rápidas.

- _Entrega/Implantação Contínua (CD)_

  A Entrega Contínua e a Implantação Contínua são práticas que se concentram em automatizar o processo de entrega e implantação do software, garantindo que novas versões do código sejam disponibilizadas de forma rápida, segura e confiável.

  A Entrega Contínua _(Continuous Delivery)_, refere-se à capacidade de entregar novas versões de software de forma automatizada e pronta para produção, mas ainda sujeita a aprovação manual antes da implantação final. Suas principais características são:

  _Automação de Builds:_ Compilação automática do código e criação de artefatos de deploy.

  _Testes Automatizados:_ Execução automatizada de testes de qualidade e desempenho.

  _Ambientes de Teste_: Implantação automatizada em ambientes de teste para validação.

  _Liberação Manual:_ Versões são preparadas automaticamente, mas a liberação final requer aprovação manual.

  A Implantação Contínua _(Continuous Deployment)_, vai além da Entrega Contínua, implantando automaticamente novas versões do software em produção após passar nos testes automatizados, sem intervenção manual. Suas principais características são:

  _Automação Total:_ Após a conclusão dos testes automatizados, a nova versão é implantada automaticamente em produção.
  Rollbacks Automáticos: Capacidade de reverter para versões anteriores automaticamente em caso de problemas.

### Integração com o Husky

- _Oque é o Husky?_

  Husky é uma ferramenta de integração do node com git hooks, que nos permite automatizar a execução de scripts ou tarefas durante diferentes etapas do fluxo de versionamento. Ele é comumente usado para garantir a integridade do código-fonte antes que as alterações sejam salvas e enviadas ao repositório. Podemos especificar diferentes scripts para serem executados no momento em que o desenvolvedor utiliza um comando git (git commit, git push), permitindo a execução do linter (eslint) ao efetuar um commit, e rodando testes unitários ao efetuar um push. Como o husky interrompe a execução do comando git em caso de erros, o desenvolvedor fica efetivamente impedido de publicar código no repositório caso os testes configurados não passem.

- _Configurações pre-commit_

  Uma das configurações que nós utilizamos para nos ajudar a padronizar nossa pipeline é a utilização de um script pre-commit no Husky:” npm run lint “. O comando faz com que o Husky execute o script “lint” no package.json de cada subdiretório:

  ###################################################################

  "lint": "eslint \"{src,apps,libs,test}/\*_/_.ts\" --fix"

  ###################################################################

  O comando acima utiliza a biblioteca eslint para analisar as pastas declaradas e, utilizando a flag “--fix” ,tentar corrigir problemas de formatação que encontrarem durante antes do projeto ser commitado. Dessa forma, conseguimos efetivamente forçar um padrão de código que é de comum acordo pela equipe, garantindo que pequenos erros de formatação não sejam publicados no repositório.

- _Configurações pre-push_
  Semelhante ao comando de “pre-commit”, o comando de pre-push nos auxilia a executar scripts antes de nossas mudanças do commit serem jogadas no repositório. Em nosso arquivo de configuração do husky contém os seguintes comandos:

  ###################################################################
  npm run check
  npm run test
  ###################################################################

  Essa série de comandos podem ser encontradas no package.json como:

  ###################################################################

  "test-backend": "cd ./api && npm run test",
  "test-e2e": "cd ./web && npm run test:e2e",

  "check-backend": "cd ./api && npm run check",
  "check-frontend": "cd ./web && npm run check"

  ###################################################################

  Como estamos utilizando um mono repositório nós executamos dois scripts diferentes para cada frente do projeto antes de um “push”:

  ###################################################################

  "test-backend": "cd ./api && npm run test",
  "test-e2e": "cd ./web && npm run test:e2e",

  "check-backend": "cd ./api && npm run check",
  "check-frontend": "cd ./web && npm run check"

  ###################################################################

  Nós utilizamos o comando “cd” para navegação para que os comandos de cada projeto sejam executados nas pastas corretas.

- _Commit semânticos_

  Utilizamos a biblioteca commit-lint para forçar um estilo de commit semântico, de forma que os desenvolvedores do projeto só podem fazer commits em um formato específico que encoraja a escrita de mensagens de commit informativas, o que é importantíssimo para manter um histórico de versões saudável e bem documentado.

  Os commits semânticos são baseados na especificação declarada em Conventional Commits. Essa especificação determina prefixos que devem ser usados nas mensagens de commit de forma que fique claro para o leitor qual o objetivo atingido com o commit. Alguns exemplos de prefixos utilizados são:
  _feat_ - implementação de uma nova funcionalidade
  _fix_ - correção de bugs e erros
  _refactor_ - modificação do código que não tem impacto para o usuário final da aplicação
  _chore_ - modificação nas ferramentas da aplicação
  _ci_ - modificações nas configurações de de integração contínua

# Testes

### Run Unit Tests (Jest)

- _Introdução_

  Os testes unitários da API têm como objetivo validar as regras de negócio e as validações do backend da aplicação de forma rápida e desacoplada de qualquer dependência externa. Isso permite aos desenvolvedores validar o funcionamento correto dos componentes da API ao longo do processo de desenvolvimento.

- _Utilização do Jest_

  O Jest é utilizado para construir suites de testes com casos de teste separados por classe. Esta ferramenta oferece funções para inicialização e destruição das dependências dos testes (beforeAll, afterAll, beforeEach e afterEach). Essas funções são empregadas para inicializar o serviço a ser testado em cada suite, bem como suas dependências.

- _Uso de Mocks_

  Para evitar o uso de um banco de dados real durante os testes unitários, são utilizados mocks dos repositórios do TypeORM. Os mocks são objetos que satisfazem a mesma interface descrita pela classe Repository<T> do TypeORM, permitindo controlar o comportamento de cada execução dos métodos. Isso possibilita forçar cenários específicos em cada caso de teste, garantindo a validação de cenários de sucesso, falha e erro, e expondo comportamentos indesejados com facilidade.

- _Teste de Controllers_

  Para testar os controllers, é utilizada a biblioteca "supertest", que permite realizar requisições HTTP de forma controlada. Essa biblioteca viabiliza a verificação do comportamento correto dos controllers e das funções atribuídas a eles, incluindo a utilização de validação nos DTOs nas requisições, comportamento correto das rotas e eventual transformação de dados através da utilização de Pipes do NestJs.

- _Conclusão_

  A combinação do Jest para testes unitários e da biblioteca "supertest" para testes de controllers proporciona uma estrutura sólida para a validação do correto funcionamento da API, permitindo aos desenvolvedores garantir a qualidade do código e a robustez das funcionalidades implementadas. Esta abordagem de teste possibilita uma rápida detecção de problemas e facilita a manutenção e evolução da aplicação ao longo do tempo.

### Playwright Tests

- _O que é o Playwright?_

  Para testar a aplicação como um todo nós optamos por utilizar o framework de testes chamado Playwright. O Framework Playwright é uma ferramenta poderosa e versátil projetada para automatizar testes de interface de usuário em navegadores da web. Desenvolvido pelo time por trás do Puppeteer, o Playwright oferece recursos avançados para interagir com páginas da web em diferentes navegadores, incluindo Chrome, Firefox e WebKit.

  Neste documento de especificação de testes, exploraremos como o Playwright pode ser utilizado para criar e executar testes automatizados de forma eficiente e abrangente. Desde a interação com elementos da página até a manipulação de eventos e a validação de comportamentos, o Playwright oferece uma API intuitiva e robusta para suportar uma variedade de cenários de teste.

- _Configuração do ambiente_

  Antes de iniciarmos os testes end-to-end (e2e) utilizando o Playwright, é crucial configurar corretamente o ambiente. Isso envolve a instalação das dependências necessárias e a preparação dos navegadores que serão utilizados nos testes.

  Para começar, podemos instalar o Playwright e suas dependências em nosso projeto com o seguinte comando:
  ###################################################################

  npm init playwright@latest

  ###################################################################

  Este comando cria um novo projeto npm e instala o Playwright, juntamente com suas dependências, no diretório do projeto. Isso garante que tenhamos acesso às últimas funcionalidades e correções de bugs fornecidas pela equipe do Playwright.

  Além disso, é essencial garantir que os navegadores alvo dos testes estejam instalados localmente. O Playwright oferece uma maneira conveniente de instalar automaticamente os navegadores necessários com o seguinte comando:
  ###################################################################

  npx playwright install

  ###################################################################

  Este comando instala os navegadores suportados pelo Playwright (como Chrome, Firefox e WebKit) na máquina local, permitindo que os testes sejam executados em cada um desses navegadores.

  Com apenas esses dois comandos, nosso ambiente estará configurado e pronto para começar a escrever e executar testes end-to-end utilizando o Playwright. Este processo simplificado de configuração nos permite concentrar mais tempo e esforços na criação de casos de teste robustos e na garantia da qualidade de nossas aplicações.

- _Identificando e interagindo com os elementos_

  O Playwright identifica elementos em uma página da web utilizando seletores CSS, XPath ou scripts JavaScript personalizados. Esses métodos permitem especificar características dos elementos, como classe, ID, texto, posição relativa e outros. Dessa forma, o Playwright é capaz de identificar e interagir com elementos específicos de forma eficiente, seja para automação de testes, scraping de dados ou outras interações.

  Já a interação com elementos envolve uma série de métodos que permitem realizar ações como clicar, preencher campos, obter texto e verificar a visibilidade dos elementos. Esses métodos, como click(), type(), textContent(), isVisible(), e outros, são usados para automatizar tarefas e simular interações do usuário. O Playwright também oferece recursos avançados para manipulação de elementos, como emulação de cliques do mouse, arrastar e soltar, permitindo uma variedade de interações sofisticadas que são úteis para automação de testes de interface de usuário, scraping de dados ou qualquer outra atividade que exija manipulação de elementos em um navegador da web.

- _Validação de comportamento_
  A validação de comportamento no Playwright é a verificação automática do comportamento esperado de uma aplicação web durante testes automatizados. Isso é feito comparando o estado atual da aplicação (como elementos visíveis, conteúdo exibido, mensagens de erro) com critérios definidos no código de teste. O Playwright oferece métodos e assertivas que permitem verificar automaticamente se a aplicação se comporta conforme o esperado em diferentes cenários, garantindo a qualidade e consistência do software ao longo do desenvolvimento.
