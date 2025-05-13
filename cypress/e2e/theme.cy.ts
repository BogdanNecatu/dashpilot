describe("ThemeSelector", () => {
  beforeEach(() => {
    cy.visit("/dashboard"); 
    cy.login("jose@test.com", "Password111@"); 
  });

  it("changes theme to dark", () => {
    cy.get('[data-testid="theme-selector"]')
      .select("dark")
      .should("have.value", "dark");

    cy.get("html").should("have.class", "dark");
  });

  it("changes theme to light", () => {
    cy.get('[data-testid="theme-selector"]')
      .select("light")
      .should("have.value", "light");

    cy.get("html").should("not.have.class", "dark"); 
  });

  it("changes theme to system", () => {
    cy.get('[data-testid="theme-selector"]')
      .select("system")
      .should("have.value", "system");

  });
});
