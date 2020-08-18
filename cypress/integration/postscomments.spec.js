/// <reference types="cypress" />

context('PostsComments', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should navigate to postscomments page', () => {
    cy.get('[data-cy=menu_postscomments]').click()
    cy.get('[data-cy=loader]').should('be.visible')
    cy.url().should('include', '/postscomments')
    cy.get('[data-cy=post]').first().should('be.visible')
    cy.get('[data-cy=post_title]').first().should('be.visible')
    cy.get('[data-cy=post_body]').first().should('be.visible')

    cy.get('[data-cy=post]').first().click()
    cy.get('[data-cy=comment]').first().should('be.visible')
    cy.get('[data-cy=comment_name]').first().should('be.visible')
    cy.get('[data-cy=comment_body]').first().should('be.visible')
  })

})
