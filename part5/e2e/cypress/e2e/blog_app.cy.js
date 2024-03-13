describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, {
      name: "Josh Javier",
      username: "joshjavier",
      password: "mabuhay"
    })
    cy.visit('')
  })

  it('Login form is shown', function() {
    cy.get('input:first').parent().should('contain', 'username')
    cy.get('input:last').parent().should('contain', 'password')
    cy.get('button').should('contain', 'log in')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.contains('username').siblings('input').type('joshjavier')
      cy.contains('password').siblings('input').type('mabuhay')
      cy.get('button').contains('log in').click()

      cy.contains('Josh Javier logged in')
    })

    it('fails with wrong credentials', function() {
      cy.contains('username').siblings('input').type('joshjavier')
      cy.contains('password').siblings('input').type('manila')
      cy.get('button').contains('log in').click()

      cy.get('[role=alert]')
        .should('contain', 'invalid username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })
})
