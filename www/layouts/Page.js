import "isomorphic-unfetch";

import styles from "./Page.styles";

export default ({ children }) => (
  <>
    <style jsx global>
      {styles}
    </style>

    {children}
  </>
);
