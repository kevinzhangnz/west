/// <reference types="cypress" />

context('Navigation', () => {
  beforeEach(() => {
    cy.visit('/')
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

  it('should show responsive menu on mobile', () => {
    cy.get('[data-cy=menu]').should('be.visible')

    // the menu should have collapse since our screen is smaller
    cy.viewport(320, 480)
    cy.get('[data-cy=menu]').should('not.be.visible')
    cy.get('[data-cy=menu_toggle]').should('be.visible').click()
    cy.get('[data-cy=menu]').find('a').should('be.visible')

    // should navigate to posts page and close the menu
    cy.get('[data-cy=menu_posts]').click()
    cy.url().should('include', '/posts')
    cy.get('[data-cy=menu]').should('not.be.visible')
  })

})
