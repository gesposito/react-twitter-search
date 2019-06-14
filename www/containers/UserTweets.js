import React from "react";
import PropTypes from "prop-types";

import Link from "next/link";

import { useUserTweets } from "../utils/api";

function getFormattedDate(date) {
  return new Date(date).toLocaleDateString();
}

function UserTweets({ userId }) {
  const [tweets, error] = useUserTweets(userId);

  if (error) {
    return (
      <div data-cy="user-tweets-error">
        Ooops: {error.message} for {userId}
      </div>
    );
  }
  if (!tweets) {
    return <div data-cy="user-tweets-loading">Loading {userId}</div>;
  }
  if (!tweets.length) {
    return <div data-cy="user-tweets-empty">{userId} has no public Tweets</div>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Date</th>
          <th>Text</th>
        </tr>
      </thead>
      <tbody>
        {tweets.map(tweet => {
          return (
            <tr key={tweet.id_str}>
              <td>
                <Link
                  href={`/tweet?tweetId=${tweet.id_str}`}
                  as={`/tweet/${tweet.id_str}`}
                >
                  <a>{tweet.id_str}</a>
                </Link>
              </td>
              <td>{getFormattedDate(tweet.created_at)}</td>
              <td>{tweet.text}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default UserTweets;

UserTweets.propTypes = {
  userId: PropTypes.string.isRequired
};
