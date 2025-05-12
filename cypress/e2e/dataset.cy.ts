describe("Dataset Page", () => {
  beforeEach(() => {
    cy.login("jose@test.com", "Password111@");
    cy.wait(2000);
    cy.contains("Data").click();
    cy.url().should("include", "/dataset");
  });

  it("loads the dataset and displays users in the table", () => {
    cy.contains("Dataset").should("be.visible");
    cy.get("table").should("exist");
    cy.get("tbody tr").should("have.length.greaterThan", 0);
  });

  it("filters users by search input", () => {
    cy.get('input[placeholder*="Search"]').type("john");
    cy.wait(1000);

    cy.get("tbody tr").each(($el) => {
      cy.wrap($el).should("contain.text", "john");
    });
  });

  it("sorts users by name when column header is clicked", () => {
    cy.contains("th", "Name").click();
    cy.wait(300);

    cy.get("tbody tr")
      .first()
      .then(($row1) => {
        const name1 = $row1.find("td").eq(1).text().trim();

        cy.contains("th", "Name").click();
        cy.wait(300);

        cy.get("tbody tr")
          .first()
          .then(($row2) => {
            const name2 = $row2.find("td").eq(1).text().trim();
            expect(name1).not.to.eq(name2);
          });
      });
  });

  it("paginates forward and backward", () => {
    cy.contains("Next ›").click();
    cy.wait(300);
    cy.get("tbody tr").first().should("exist");

    cy.contains("‹ Prev").click();
    cy.wait(300);
    cy.get("tbody tr").first().should("exist");
  });

  it("navigates to user detail page on row click", () => {
    cy.get("tbody tr").first().click();
    cy.url().should("match", /\/dataset\/\d+$/);
  });

  it("changes items per page", () => {
    cy.get('[data-testid="limit-selector"]').eq(0).select("40");
    cy.wait(300);
    cy.get("tbody tr").should("have.length.lte", 40);
  });
});

export {};
