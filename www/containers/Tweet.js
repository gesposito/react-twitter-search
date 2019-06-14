import React from "react";
import PropTypes from "prop-types";

import { useTweet } from "../utils/api";

import TweetDetail from "../components/Tweet";

function Tweet({ tweetId }) {
  const [tweet, error] = useTweet(tweetId);

  if (error) {
    return (
      <>
        <div data-cy="tweet-error">Ooops: {tweetId}</div>
        <div>{error.message}</div>
      </>
    );
  }
  if (!tweet) {
    return <div data-cy="tweet-loading">Loading {tweetId}</div>;
  }

  return (
    <section>
      <TweetDetail tweet={tweet} />
    </section>
  );
}

export default Tweet;

Tweet.propTypes = {
  tweetId: PropTypes.string.isRequired
};
