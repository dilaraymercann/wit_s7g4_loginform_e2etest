describe('Login Test', () => {

  beforeEach(() => {
    cy.visit("http://localhost:5173")
  })

  it('geçerli giriş', () => {

    cy.get('[data-cy="email-input"]').type('test@gmail.com')
    cy.get('[data-cy="password-input"]').type('Password1!')
    cy.get('[data-cy="terms-checkbox"]').check()

    cy.get('[data-cy="submit-button"]').click();

    cy.url().should('include', '/success')
    cy.contains('Login Başarılı')

  })
  it("email yanlış", () => {

    cy.get('[data-cy="email-input"]').type("testgmail.com")
    cy.get('[data-cy="password-input"]').type("Password1!")
    cy.get('[data-cy="terms-checkbox"]').check()

    cy.get('[data-cy="email-error"]')
      .should("have.length", 1)
      .and("contain", "Lütfen geçerli bir e-posta adresi giriniz.")

    cy.get('[data-cy="submit-button"]').should("be.disabled")

  })
  it("email ve password yanlış", () => {

    cy.get('[data-cy="email-input"]').type("testgmail.com")
    cy.get('[data-cy="password-input"]').type("123")
    cy.get('[data-cy="terms-checkbox"]').check()

    cy.get('[data-cy="email-error"]').should("exist")

    cy.get('[data-cy="password-error"]')
      .should("exist")
      .and("contain", "Şifre en az 8 karakter")

    cy.get('[data-cy="submit-button"]').should("be.disabled")

  })
  it("terms kabul edilmezse submit disabled", () => {

    cy.get('[data-cy="email-input"]').type("test@gmail.com")
    cy.get('[data-cy="password-input"]').type("Password1!")

    cy.get('[data-cy="submit-button"]').should("be.disabled")

  })

})