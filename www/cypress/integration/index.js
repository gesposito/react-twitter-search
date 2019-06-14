const user = "paulg";

describe("Index page", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("focuses Input and checks starting empty value", () => {
    cy.get("[data-cy=user-search-input]")
      .should("have.focus")
      .should("have.value", "");
  });

  it("accepts new values in Input and navigates to user page", () => {
    cy.get("[data-cy=user-search-input]")
      .type(user)
      .should("have.value", user)
      .type(`{enter}`);

    cy.url().should("include", `/user/${user}`);
  });
});
