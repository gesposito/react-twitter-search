const user = "paulg";

describe("User page", () => {
  beforeEach(() => {
    cy.server();
  });

  it("checks for starting value in Input", () => {
    cy.route(
      "GET",
      `/api/node?path=statuses/user_timeline.json?screen_name=${user}`,
      []
    ).as("request");

    cy.visit(`/user/${user}`);

    cy.get("[data-cy=user-search-input]").should("have.value", `${user}`);

    cy.wait("@request");
  });

  it("performs a network request and shows loading and empty messages", () => {
    cy.route({
      method: "GET",
      url: `/api/node?path=statuses/user_timeline.json?screen_name=${user}`,
      status: 200,
      response: [],
      delay: 100
    }).as("request");

    cy.visit(`/user/${user}`);

    // Loading (delay)
    cy.get("[data-cy=user-tweets-loading]").should("be.visible");

    cy.wait("@request");

    // Loaded and empty
    cy.get("[data-cy=user-tweets-empty]").should("be.visible");
  });

  it("performs a network request and shows loading and error messages", () => {
    cy.route({
      method: "GET",
      url: `/api/node?path=statuses/user_timeline.json?screen_name=${user}`,
      status: 500,
      response: {
        errors: [{ message: "500" }]
      },
      delay: 100
    }).as("request");

    cy.visit(`/user/${user}`);

    // Loading (delay)
    cy.get("[data-cy=user-tweets-loading]").should("be.visible");

    cy.wait("@request");

    // Loaded and errored
    cy.get("[data-cy=user-tweets-error]").should("be.visible");
  });

  it("performs a network request and loads properly", () => {
    cy.route({
      method: "GET",
      url: `/api/node?path=statuses/user_timeline.json?screen_name=${user}`,
      status: 200,
      response: `fixture:users/${user}.json`,
      delay: 100
    }).as("request");

    cy.visit(`/user/${user}`);

    // Loading (delay)
    cy.get("[data-cy=user-tweets-loading]").should("be.visible");

    cy.wait("@request");

    // Loaded
    cy.get("table").should("be.visible");
    cy.get("table tbody tr").should("have.length", 7);
  });

  it("should navigate to the Tweet Page", () => {
    cy.route({
      method: "GET",
      url: `/api/node?path=statuses/user_timeline.json?screen_name=${user}`,
      status: 200,
      response: `fixture:users/${user}.json`,
      delay: 100
    }).as("request");

    cy.visit(`/user/${user}`);

    cy.wait("@request");

    cy.get("table tbody tr:nth-child(1) a").click();
    cy.url().should("include", `/tweet/`);
  });
});
