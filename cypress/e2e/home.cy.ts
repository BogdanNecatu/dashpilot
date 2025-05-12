describe("Home Page", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("renders the homepage with title and dashboard button", () => {
    cy.contains("Bienvenido a DashPilot").should("be.visible");

    cy.contains("Ir al Dashboard").should("be.visible");

    cy.contains("Aplicación de prueba técnica").should("be.visible");
  });

  it("renders the logo image with proper alt text", () => {
    cy.get('img[alt="DashPilot Logo"]').should("be.visible");
  });

  it("has semantic HTML elements for structure", () => {
    cy.get("section").should("exist");

    cy.get("h1").should("contain.text", "Bienvenido a DashPilot");
  });

  it("redirects to login if user is not authenticated", () => {
    cy.clearCookies();

    cy.contains("Ir al Dashboard").click();

    cy.url().should("include", "/login");
  });

  it("redirects to dashboard if user is authenticated", () => {
    cy.setCookie("next-auth.session-token", "mock-session");

    cy.reload();

    cy.contains("Ir al Dashboard").click();

    cy.url().should("include", "/dashboard");
  });

  it("button has accessible label and hover class", () => {
    cy.contains("Ir al Dashboard")
      .should("have.attr", "href", "/dashboard")
      .and("have.class", "hover:bg-blue-700");
  });

  it("renders correctly on a mobile screen", () => {
    cy.viewport("iphone-8");

    cy.visit("/");

    cy.contains("Bienvenido a DashPilot").should("be.visible");
    cy.contains("Ir al Dashboard").should("be.visible");
  });
});

export {};
