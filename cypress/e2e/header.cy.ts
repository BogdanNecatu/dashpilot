describe("Header", () => {
  it("renders the logo and navigates to homepage", () => {
    cy.wait(1000);
    cy.visit("/");
    cy.get('[data-cy="logo"]').should("be.visible");

    cy.get('a[href="/"]').click();
    cy.url().should("eq", `${Cypress.config().baseUrl}/`);
  });

  it("displays username and navigates between pages", () => {
    cy.login("jose@test.com", "Password111@");

    cy.url().should("include", "/dashboard");

    cy.contains("Hi, José Maria", { timeout: 5000 }).should("be.visible");

    cy.contains("Dashboard").click();
    cy.url().should("include", "/dashboard");

    cy.contains("Data").click();
    cy.url().should("include", "/dataset");

    cy.contains("Logout").click();
    cy.url({ timeout: 5000 }).should("eq", `${Cypress.config().baseUrl}/`);
  });
});
