/// <reference types="cypress" />

context('Posts', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should navigate to posts and post page', () => {
    cy.get('[data-cy=menu_posts]').click()
    cy.get('[data-cy=loader]').should('be.visible')
    cy.url().should('include', '/posts')
    cy.get('[data-cy=post]').first().should('be.visible')

    cy.get('.post_0').click()
    cy.url().should('include', '/posts/1')
    cy.get('[data-cy=post]').should('be.visible')
    cy.get('[data-cy=post_title]').should('be.visible')
    cy.get('[data-cy=post_body]').should('be.visible')
    cy.get('[data-cy=comments]').should('be.visible')
    cy.get('[data-cy=comment]').first().should('be.visible')
    cy.get('[data-cy=comment_name]').first().should('be.visible')
    cy.get('[data-cy=comment_body]').first().should('be.visible')
  })

})
