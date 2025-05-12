describe("ThemeSelector", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("changes theme to dark using invoke and triggers change", () => {
    cy.get('[data-testid="theme-selector"]')
      .invoke("val", "dark")
      .trigger("change");

    cy.wait(300);

    cy.get("html").should("have.class", "dark");
  });

  it("changes theme to light using invoke and triggers change", () => {
    cy.get('[data-testid="theme-selector"]')
      .invoke("val", "light")
      .trigger("change");

    cy.wait(300);

    cy.get("html").should("have.class", "light");
  });

  it("changes theme to system using invoke and triggers change", () => {
    cy.get('[data-testid="theme-selector"]')
      .invoke("val", "system")
      .trigger("change");

    cy.wait(300);

    cy.get("html").should("not.have.class", "dark");
  });
});

export {};
