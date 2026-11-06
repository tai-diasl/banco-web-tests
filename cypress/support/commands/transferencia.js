Cypress.Commands.add('realizarTransferencia', (contaOrigem, contaDestino, valor) => {
  cy.selecionarOpcapNaComboBox('conta-origem', contaOrigem)
  cy.selecionarOpcapNaComboBox('conta-destino', contaDestino)
  cy.get('#valor').click().type(valor)
  cy.contains('button', 'Transferir').click()  
})