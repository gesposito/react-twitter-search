import React from "react";

import Page from "../layouts/Page";
import TweetDetail from "../containers/Tweet";

function Tweet({ query: { tweetId } }) {
  return (
    <Page>
      <TweetDetail tweetId={tweetId} />
    </Page>
  );
}

Tweet.getInitialProps = ({ query }) => {
  return { query };
};

export default Tweet;
