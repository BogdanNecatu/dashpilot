describe("Login Page", () => {
  beforeEach(() => {
    cy.visit("/login");
  });

  it("renders the login form with inputs and button", () => {
    cy.contains("Sign in").should("be.visible");

    cy.get("input#email").should("exist");

    cy.get("input#password").should("exist");

    cy.get('button[type="submit"]').should("not.be.disabled");
  });

  it("displays an error for invalid credentials", () => {
    cy.get("input#email").type("invalid@email.com");
    cy.get("input#password").type("wrongpassword");

    cy.get('button[type="submit"]').click();

    cy.contains("Invalid credentials").should("be.visible");
  });

  it("redirects to dashboard on successful login", () => {
    cy.login("jose@test.com", "Password111@");
    cy.url().should("include", "/dashboard");
  });

  it("toggles password visibility when clicking the icon", () => {
    cy.get("input#password").should("have.attr", "type", "password");

    cy.get("input#password").parent().find("span").click();

    cy.get("input#password").should("have.attr", "type", "text");
  });
});

export {};
