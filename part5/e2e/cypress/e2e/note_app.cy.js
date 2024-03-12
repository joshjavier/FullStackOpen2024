describe('Note app', () => {
  beforeEach(function() {
    cy.visit('http://localhost:5173')
  })

  it('front page can be opened', function() {
    cy.contains('Notes')
    cy.contains('Note app, Department of Computer Science, University of Helsinki 2024')
  })

  it('login form can be opened', function() {
    cy.contains('login').click()
  })

  it('user can login', function() {
    cy.contains('login').click()
    cy.get('#input-username').type('mluukkai')
    cy.get('#input-password').type('salainen')
    cy.get('#button-login').click()

    cy.contains('Hello Matti Luukkainen!')
  })
})
