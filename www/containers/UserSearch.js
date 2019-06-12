import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import Router from "next/router";

import UserTweets from "./UserTweets";

function UserSearch({ userId = "" }) {
  const [username, setUsername] = useState(userId);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const href = `/user?userId=${username}`;
      const as = `/user/${username}`;

      username && Router.push(href, as);
    }, 300);
    return () => clearTimeout(timeout);
  }, [username]);

  return (
    <section>
      <h1>Search Twitter users</h1>

      <div>
        <label htmlFor="search">Enter a username (i.e. _gesposito)</label>
      </div>
      <div>
        <input
          autoFocus
          id="search"
          type="text"
          value={username}
          placeholder="Enter a username (i.e. _gesposito)"
          onChange={({ target: { value } }) => setUsername(value)}
        />
      </div>
      
      {username && username === userId && (
        <div>
          <h2>{username}'s latest Tweets:</h2>
          <UserTweets userId={username} />
        </div>
      )}
    </section>
  );
}

export default UserSearch;

UserSearch.getInitialProps = props => {
  console.log("props");
  console.log(props);

  return props;
};

UserSearch.propTypes = {
  userId: PropTypes.string
};
