import React from "react";

import Page from "../layouts/Page";
import UserSearch from "../containers/UserSearch";

function User({ query: { userId } }) {
  return (
    <Page>
      <UserSearch userId={userId} />
    </Page>
  );
}

User.getInitialProps = ({ query }) => {
  return { query };
};

export default User;
