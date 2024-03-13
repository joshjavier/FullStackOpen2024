describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    cy.visit('')
  })

  it('Login form is shown', function() {
    cy.get('input:first').parent().should('contain', 'username')
    cy.get('input:last').parent().should('contain', 'password')
    cy.get('button').should('contain', 'log in')
  })
})
