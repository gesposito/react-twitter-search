import React from "react";
import PropTypes from "prop-types";

import { useTweet } from "../utils/api";

import TweetDetail from "../components/Tweet";

function Tweet({ tweetId }) {
  const [tweet, error] = useTweet(tweetId);

  if (error) {
    return (
      <>
        <div>Ooops: {tweetId}</div>
        <div>{error.message}</div>
      </>
    );
  }
  if (!tweet) {
    return <div>Loading {tweetId}</div>;
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
