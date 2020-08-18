/// <reference types="cypress" />

context('Navigation', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should show responsive menu on mobile', () => {
    cy.get('[data-cy=menu]').should('be.visible')

    // change viewport to mobile
    cy.viewport(320, 480)
    cy.wait(500)
    cy.get('[data-cy=menu]').should('not.be.visible')

    // should display toggle menu
    cy.get('[data-cy=menu_toggle]').should('be.visible').click()
    cy.wait(500)
    cy.get('[data-cy=menu]').should('be.visible')

    cy.get('[data-cy=menu_toggle]').click()
    cy.wait(500)
    cy.get('[data-cy=menu]').should('not.be.visible')

    // should navigate to posts page
    cy.get('[data-cy=menu_toggle]').click()
    cy.get('[data-cy=menu_posts]').should('be.visible').click()
    cy.url().should('include', '/posts')

    // should navigate to home page
    cy.get('[data-cy=menu_toggle]').click()
    cy.get('[data-cy=menu_home]').should('be.visible').click()
    cy.get('[data-cy=menu]').should('not.be.visible')
    cy.url().should('include', '/')
  })

  it('should navigate to Home page', () => {
    cy.get('[data-cy=menu_posts]').click()
    cy.get('[data-cy=menu_home]').click()
    cy.url().should('include', '/')
  })

  it('should navigate to Posts page', () => {
    cy.get('[data-cy=menu_posts]').click()
    cy.url().should('include', '/posts')
  })

  it('should navigate to PostsComments page', () => {
    cy.get('[data-cy=menu_postscomments]').click()
    cy.url().should('include', '/postscomments')
  })

})
