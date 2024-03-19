describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen',
    })
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, {
      name: 'Arto Hellas',
      username: 'hellas',
      password: 'secret',
    })
    cy.visit('')
  })

  it('Login form is shown', function() {
    cy.contains('log in to application')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('[data-testid="username"]').type('mluukkai')
      cy.get('[data-testid="password"]').type('salainen')
      cy.contains('Log in').click()

      cy.contains(/welcome/i)
    })

    it('fails with wrong credentials', function() {
      cy.get('[data-testid="username"]').type('mluukkai')
      cy.get('[data-testid="password"]').type('wrong')
      cy.contains('Log in').click()

      cy.contains(/wrong credentials/i)
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'mluukkai', password: 'salainen' })
    })

    it('A blog can be created', function() {
      cy.contains('create new blog').click()
      cy.get('[data-testid="title"]').type("You're NOT gonna need it!")
      cy.get('[data-testid="url"]').type('https://ronjeffries.com/xprog/articles/practices/pracnotneed/')
      cy.get('[data-testid="author"]').type('Ron Jeffries')
      cy.get('form > button').contains(/create/i).click()

      cy.contains("You're NOT gonna need it!")
      cy.contains('Ron Jeffries')
    })
  })

  describe('When a blog has been created', function() {
    beforeEach(function() {
      cy.login({ username: 'mluukkai', password: 'salainen' })
      cy.createBlog({
        title: "You're NOT gonna need it!",
        author: 'Ron Jeffries',
        url: 'https://ronjeffries.com/xprog/articles/practices/pracnotneed/',
      })
    })

    it('it can be liked', function() {
      cy.get('.blog > button').contains('view').click()
      cy.get('button').contains('like').click()
      cy.contains('likes 1')
    })

    it('the creator can delete it', function() {
      cy.get('.blog > button').contains('view').click()
      cy.get('button').contains('remove').click()

      cy.contains('removed')
      cy.wait(5000)
      cy.get('html').should('not.contain', "You're NOT gonna need it!")
    })

    it('a non creator cannot delete a blog', function() {
      cy.contains('log out').click()
      cy.login({ username: 'hellas', password: 'secret' })
      cy.get('.blog > button').contains('view').click()
      cy.get('button').contains('remove').should('not.exist')
    })
  })

  describe('When there exists several blogs', function() {
    const blogs = [
      { title: 'blog1', author: 'author1', url: 'google.com' },
      { title: 'blog2', author: 'author2', url: 'google.com' },
      { title: 'blog3', author: 'author3', url: 'google.com' },
    ]

    beforeEach(function() {
      cy.login({ username: 'mluukkai', password: 'salainen' })
      cy.createBlog(blogs[0])
      cy.createBlog(blogs[1])
      cy.createBlog(blogs[2])
    })

    it('those are ordered by the likes', function() {
      cy.get('.blog').contains(blogs[0].title).contains('view').click()
      cy.get('.blog').contains(blogs[0].title).contains('like').as('like0')
      cy.get('.blog').contains(blogs[1].title).contains('view').click()
      cy.get('.blog').contains(blogs[1].title).contains('like').as('like1')
      cy.get('.blog').contains(blogs[2].title).contains('view').click()
      cy.get('.blog').contains(blogs[2].title).contains('like').as('like2')

      cy.get('@like2').click()
      cy.get('.blog').contains(blogs[2].title).contains('likes 1')
      cy.get('@like2').click()
      cy.get('.blog').contains(blogs[2].title).contains('likes 2')
      cy.get('@like2').click()
      cy.get('.blog').contains(blogs[2].title).contains('likes 3')
      cy.get('@like2').click()
      cy.get('.blog').contains(blogs[2].title).contains('likes 4')

      cy.get('@like1').click()
      cy.get('.blog').contains(blogs[1].title).contains('likes 1')
      cy.get('@like1').click()
      cy.get('.blog').contains(blogs[1].title).contains('likes 2')

      cy.get('@like0').click()
      cy.get('.blog').contains(blogs[0].title).contains('likes 1')

      cy.get('.blog').eq(0).should('contain', blogs[2].title)
      cy.get('.blog').eq(1).should('contain', blogs[1].title)
      cy.get('.blog').eq(2).should('contain', blogs[0].title)
    })
  })
})
