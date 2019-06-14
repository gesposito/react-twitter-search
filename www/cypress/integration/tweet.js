const tweet = "1139094510422646789";
const retweet = "1139099367854489600";

describe("Tweet page", () => {
  beforeEach(() => {
    cy.server();
  });

  it("renders a Tweet properly", () => {
    const tweetId = tweet;
    cy.route({
      method: "GET",
      url: `http://localhost:3000/api/node?path=statuses/show.json?id=${tweetId}&tweet_mode=extended`,
      status: 200,
      response: `fixture:tweets/${tweetId}.json`,
      delay: 100
    }).as("request");
    cy.visit(`/tweet/${tweetId}`);

    // Loading (delay)
    cy.get("[data-cy=tweet-loading]").should("be.visible");

    cy.wait("@request");

    // Loaded
    cy.get("[data-cy=tweet-detail]").should("be.visible");
  });

  it("renders a Retweet properly", () => {
    const tweetId = retweet;
    cy.route({
      method: "GET",
      url: `http://localhost:3000/api/node?path=statuses/show.json?id=${tweetId}&tweet_mode=extended`,
      status: 200,
      response: `fixture:tweets/${tweetId}.json`,
      delay: 100
    }).as("request");
    cy.visit(`/tweet/${tweetId}`);

    // Loading (delay)
    cy.get("[data-cy=tweet-loading]").should("be.visible");

    cy.wait("@request");

    // Loaded
    cy.get("[data-cy=tweet-detail]").should("have.length", 2);
    cy.get("[data-cy=tweet-detail] [data-cy=tweet-detail]").should(
      "be.visible"
    );
  });

  it("should navigate back to the Tweet Page", () => {
    const tweetId = retweet;
    cy.route({
      method: "GET",
      url: `http://localhost:3000/api/node?path=statuses/show.json?id=${tweetId}&tweet_mode=extended`,
      status: 200,
      response: `fixture:tweets/${tweetId}.json`,
      delay: 100
    }).as("request");
    cy.visit(`/tweet/${tweetId}`);

    cy.wait("@request");

    cy.get("[data-cy=tweet-detail] a")
      .first()
      .click();
    cy.url().should("include", `/user/`);
  });
});
