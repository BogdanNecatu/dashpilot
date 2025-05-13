describe("Dataset and User Detail Page", () => {
  beforeEach(() => {
    cy.login("jose@test.com", "Password111@");
    cy.wait(2000);
    cy.contains("Data").click();
    cy.url().should("include", "/dataset");
  });

  it("loads the dataset and navigates to user detail page", () => {
    cy.get("table").should("exist");
    cy.get("tbody tr").should("have.length.greaterThan", 0);
    cy.get('input[placeholder*="Search"]').type("Abigail");
    cy.wait(1000);
    cy.get("tbody tr").first().click();

    cy.url().should("match", /\/dataset\/\d+$/);
    cy.wait(2000);

    cy.get("img")
      .should("have.attr", "src")
      .and("include", "/_next/image?url=");

    cy.get("h2").should("contain.text", "Abigail Rivera");
    cy.get("p").should("contain.text", "abigail.rivera@x.dummyjson.com");

    cy.get("a").contains("Go back to dataset").click();
    cy.url().should("include", "/dataset");
  });
});

export {};
