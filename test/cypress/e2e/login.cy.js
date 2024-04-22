describe('template spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
    cy.get('[class="primary-button"]').contains('Sign In').click()
  })
  it('TC2-1: all empty string', () => {
    cy.get('[class="disabled-button"]').contains('Sign In').should('have.attr', 'disabled')
    cy.wait(5000)
  })
  it('TC2-2:', () => {
    cy.get('[id="login_email"]').type('{"$gt":""}', { parseSpecialCharSequences: false })
    cy.get('[id="login_password"]').type('12345678')
    cy.get('[id="login_submit"]').click()

    cy.contains('Email or password is wrong!').should('be.visible')
    cy.wait(5000)
  })
  it('TC2-3:', () => {
    cy.get('[id="login_email"]').type('login@gmail.com')
    cy.get('[id="login_password"]').type('12345678')
    cy.get('[id="login_submit"]').click()
    
    cy.contains('Email or password is wrong!').should('be.visible')
    cy.wait(5000)
  })
  it('TC2-4:', () => {
    cy.get('[id="login_email"]').type('provider@test.gg')
    cy.get('[id="login_password"]').type('88888888')
    cy.get('[id="login_submit"]').click()
    
    cy.contains('Email or password is wrong!').should('be.visible')
    cy.wait(5000)
  })
  it('TC2-5:', () => {
    cy.get('[id="login_email"]').type('provider@test.gg')
    cy.get('[id="login_password"]').type('12345678')
    cy.get('[id="login_submit"]').click()
    
    cy.get('a[href="/chats"]').should('exist');
    cy.wait(10000)
  })
})