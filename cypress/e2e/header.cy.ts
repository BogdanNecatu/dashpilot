describe("Header", () => {
  it("renders the logo and navigates to the homepage when clicked", () => {
    cy.visit("/");
    cy.get('img[alt="DashPilot Logo"]').should("be.visible");

    cy.get('a[href="/"]').click();
    cy.url().should("eq", `${Cypress.config().baseUrl}/`);
  });

  it("displays the username when user is logged and navigates to dashboard and dataset, and clicking the logout button ", () => {
    cy.login("jose@test.com", "Password111@");

    cy.url().should("include", "/dashboard");

    cy.contains("Hi,").should("be.visible");

    cy.contains("Dashboard").click();

    cy.url().should("include", "/dashboard");

    cy.contains("Data").click();

    cy.url().should("include", "/dataset");

    cy.contains("Logout").click();

    cy.url().should("eq", `${Cypress.config().baseUrl}/`);
  });
});

export {};
