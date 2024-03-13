describe('Blog app', function() {
  beforeEach(function() {
    // Clear test database
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)

    // Create a new user
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

  describe('When logged in', function() {
    beforeEach(function() {
      // Log in and save auth token in local storage
      cy.request('POST', `${Cypress.env('BACKEND')}/login`, {
        username: 'joshjavier',
        password: 'mabuhay'
      }).then(response => {
        localStorage.setItem('bloglistUser', JSON.stringify(response.body))
        cy.visit('')
      })
    })

    it('A blog can be created', function() {
      cy.contains('create new blog').click()

      cy.contains('title').siblings('input').type('Simplicity of IRC')
      cy.contains('author').siblings('input').type('Susam Pal')
      cy.contains('url').siblings('input').type('https://susam.net/simplicity-of-irc.html')
      cy.get('button[type=submit]').click()

      cy.get('[role=alert]')
        .should('contain', 'a new blog Simplicity of IRC by Susam Pal added')
        .should('have.css', 'color', 'rgb(0, 128, 0)')
    })
  })
})
