import React from "react";
import PropTypes from "prop-types";

import Link from "next/link";

import styles from "./Tweet.styles";

function getFormattedDate(date) {
  return new Date(date).toLocaleDateString();
}

function Tweet({ tweet }) {
  return (
    <>
      <style jsx>{styles}</style>

      <blockquote className="tweet-container" data-cy="tweet-detail">
        <div className="tweet-header">
          <div>{tweet.user.name} </div>
          <div>
            <Link
              href={`/user?userId=${tweet.user.screen_name}`}
              as={`/user/${tweet.user.screen_name}`}
            >
              <a>{tweet.user.screen_name}</a>
            </Link>
          </div>
          <div>{getFormattedDate(tweet.created_at)} </div>
        </div>
        <div className="tweet-body">{tweet.full_text} </div>
        <hr />
        <div className="tweet-footer">
          <div>Retweets {tweet.retweet_count} </div>
          <div>Likes {tweet.favorite_count} </div>
        </div>

        {tweet.retweeted_status && <Tweet tweet={tweet.retweeted_status} />}
      </blockquote>
    </>
  );
}

export default Tweet;
