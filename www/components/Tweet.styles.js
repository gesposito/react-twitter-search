import css from "styled-jsx/css";

export default css`
  .tweet-container {
    border: 1px solid grey;
    padding: 10px;
  }

  .tweet-header,
  .tweet-footer {
    display: flexbox;
  }

  .tweet-header > div,
  .tweet-footer > div {
    margin-right: 5px;
  }
  
  .tweet-body {
    margin: 10px 0;
  }
`;
