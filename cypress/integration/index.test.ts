it('renders', () => {
    cy.visit('/')

    cy.injectAxe()
    cy.checkA11y()

    cy.get('select[title="Evolution speed"]').should('have.value', 'default')

    cy.contains('Generation: 1')

    cy.get('button').contains('Next generation').click()
    cy.contains('Generation: 2')
    cy.get('button').contains('Reset').click()
    cy.contains('Generation: 1')
    cy.get('button').contains('Evolve').click()
    cy.contains('Generation: 4')
    cy.get('button').contains('Evolve').click()
    cy.get('select[title="Evolution speed"]').select('fast')

    cy.reload()

    cy.get('select[title="Evolution speed"]').should('not.have.text', 'Generation: 1')
    cy.get('select[title="Evolution speed"]').select('fast')
})

export {}
