/* eslint-disable no-trailing-spaces */
/* eslint-disable no-undef */
describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'HorseMan',
      username: 'rick',
      password: 'morty'
    }
  
    cy.request('POST', 'http://localhost:3003/api/users/', user) 
    cy.visit('http://localhost:3000')

  })

  
  it('login form can be opened', function() {
    cy.contains('log in').click()
  })

  it('login fails with wrong password', function() {
    cy.contains('log in').click()
    cy.get('#username').type('rick')
    cy.get('#password').type('ssss')
    cy.get('#login-button').click()

    cy.contains('Wrong credentials')
    cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
  })

  it('user can login', function () {
    cy.contains('log in').click()
    cy.get('#username').type('rick')
    cy.get('#password').type('morty')
    cy.get('#login-button').click()

    cy.contains('HorseMan logged-in')
  })
  
  describe('when logged in', function() {
    beforeEach(function() {
      cy.contains('log in').click()
      cy.get('input:first').type('rick')
      cy.get('input:last').type('morty')
      cy.get('#login-button').click()

      //Makes test blogs by default
      cy.contains('new blog').click()
      cy.get('#title').type('JerrysWorld')
      cy.get('#author').type('Jerry')
      cy.get('#url').type('www.yoyoJerryis.com')
      cy.contains('create new blog').click()
      cy.contains('JerrysWorld') 

      cy.contains('new blog').click()
      cy.get('#title').type('Rick is a noob')
      cy.get('#author').type('Jerrys diaries')
      cy.get('#url').type('www.ydoyoJdddddedddrddddrddyidds.com')
      cy.contains('create new blog').click()
      cy.contains('Rick is a noob')
      cy.contains('View').click()
      cy.contains('Like').click()
      cy.contains('Like').click()
      cy.contains('Like').click()
      cy.contains('Like').click()
      cy.contains('Like').click()
      cy.contains('Like').click()
    })

    it('a new blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('a note created by cypress')
      cy.get('#author').type('cypressYoooo')
      cy.get('#url').type('www.cypressyouknoiw.com')
      cy.contains('create new blog').click()
      cy.contains('a note created by cypress')
    })

    it('like button works', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('a note created by cypress')
      cy.get('#author').type('cypressYoooo')
      cy.get('#url').type('www.cypressyouknoiw.com')
      cy.contains('create new blog').click()
      cy.contains('a note created by cypress')
      cy.contains('View').click()

      cy.contains('Likes: 0')
      //Have to click two times like for it to refresh. A bug that needs to be fixed.
      cy.contains('Like').click()
      cy.contains('Like').click()
      cy.contains('Likes: 3')
      
    })

    it('Can delete blogs', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('a note created by cypress')
      cy.get('#author').type('cypressYoooo')
      cy.get('#url').type('www.cypressyouknoiw.com')
      cy.contains('create new blog').click()
      cy.contains('a note created by cypress')
      cy.contains('View').click()
      cy.contains('remove').click()
      cy.contains('remove').should('not.exist')
    })

    it('Sorts the blogs by likes', function() {
      
    })
  })
/*  it('front page can be opened', function() {
    cy.contains('Blogs')
  }) */
})