# Banco Web Tests

Projeto de testes automatizados para aprender e praticar testes end-to-end com Cypress e JavaScript. Os cenários exercitam os fluxos de login e transferência da aplicação Banco Web.

## Componentes

- **Cypress**: framework de automação e execução dos testes end-to-end.
- **cypress-mochawesome-reporter**: gera relatórios HTML das execuções.
- `cypress/e2e/`: especificações dos testes (`login.cy.js` e `transferencia.cy.js`).
- `cypress/fixtures/credenciais.json`: dados de login válidos e inválidos usados nos testes.
- `cypress/support/commands/`: implementação dos comandos personalizados, divididos entre comandos comuns, login e transferência.
- `cypress/support/e2e.js`: carrega os comandos e registra o reporter antes da execução dos testes.
- `cypress.config.js`: configura a URL base (`http://localhost:4000`) e o reporter.

## Pré-requisitos

- Node.js e npm instalados.
- A [API do Banco](https://github.com/juliodelimas/banco-api) e a [aplicação Banco Web](https://github.com/juliodelimas/banco-web) devem estar instaladas e em execução antes dos testes.
- A aplicação web deve estar acessível em `http://localhost:4000`, conforme `baseUrl` em `cypress.config.js`.

Inicie a API e a aplicação seguindo as instruções dos respectivos repositórios. Mantenha os dois serviços em execução durante os testes.

## Instalação

Na raiz deste projeto, instale as dependências:

```bash
npm install
```

## Execução

Com a API e a aplicação web em execução, use um dos comandos:

```bash
npm test
```

Outras opções disponíveis:

```bash
npm run cy:headed   # executa os testes com o navegador visível
npm run cy:open     # abre a interface interativa do Cypress
npm run test-qa     # atualmente equivale a cypress run
npm run test-prod   # atualmente equivale a cypress run
```

Os scripts `test-qa` e `test-prod` ainda não configuram ambientes diferentes; ambos usam a mesma `baseUrl` definida no Cypress.

## Testes

### Login (`cypress/e2e/login.cy.js`)

- Login com credenciais válidas: espera que a tela de transferência fique visível.
- Login com credenciais inválidas: espera a mensagem `Erro no login. Tente novamente.`.

Os dados usados nesses cenários estão em `cypress/fixtures/credenciais.json`.

### Transferências (`cypress/e2e/transferencia.cy.js`)

- Transferência válida de R$ 15,00: espera a mensagem `Transferência realizada!`.
- Transferência de R$ 6.000,00 sem token: espera a mensagem de que é necessária autenticação para valores acima de R$ 5.000,00.

## Custom Commands

Os comandos são carregados por `cypress/support/commands.js` e ficam agrupados em `cypress/support/commands/`:

| Comando | Arquivo | Finalidade |
| --- | --- | --- |
| `cy.verificarMensagemNoToast(mensagem)` | `common.js` | Verifica se o toast exibe exatamente a mensagem informada. |
| `cy.selecionarOpcapNaComboBox(labelDoCampo, opcao)` | `common.js` | Abre a combo box identificada pelo campo e seleciona uma opção. |
| `cy.fazerLoginComCredenciaisValidas()` | `login.js` | Lê as credenciais válidas da fixture, preenche o formulário e entra no sistema. |
| `cy.fazerLoginComCredenciaisInvalidas()` | `login.js` | Lê as credenciais inválidas da fixture e tenta entrar no sistema. |
| `cy.realizarTransferencia(contaOrigem, contaDestino, valor)` | `transferencia.js` | Seleciona origem e destino, informa o valor e confirma a transferência. |

## Relatórios e evidências

Após uma execução, o `cypress-mochawesome-reporter` gera um relatório HTML em `cypress/reports/html/index.html`. Os testes também registram capturas de tela em `cypress/screenshots/`. A gravação de vídeos está desativada na configuração atual.