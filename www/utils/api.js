import { useState, useEffect } from "react";

const getFromAPI = baseURL => endPoint =>
  fetch(`${baseURL}${endPoint}`)
    .then(res => res.json())
    .catch(err => {
      console.error(err.message);
    });

const getProxiedTwitter = getFromAPI(`/api/node?path=`);

function memoizeAsync(func) {
  const memo = async function(key) {
    if (!memo.cache.has(key)) {
      memo.cache.set(key, await func.apply(this, arguments));
    }

    return memo.cache.get(key);
  };
  memo.cache = new Map();
  return memo;
}

const memoizedGetProxiedTwitter = memoizeAsync(getProxiedTwitter);

function getTwitterError(data) {
  if (!data) {
    return {
      message: "API Error"
    };
  }

  if (data.errors) {
    return { message: data.errors.map(error => error.message).join(". ") };
  }

  return null;
}

function useTwitterEndpoint(endpoint) {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let didCancel = false;

    async function fetchData() {
      const data = await memoizedGetProxiedTwitter(endpoint);

      if (!didCancel) {
        setError(getTwitterError(data));
        setResponse(data);
      }
    }

    fetchData();

    return () => {
      didCancel = true;
    };
  }, [endpoint]);

  return [response, error];
}

const useUserTweets = userId =>
  useTwitterEndpoint(`statuses/user_timeline.json?screen_name=${userId}`);

const useTweet = tweetId =>
  useTwitterEndpoint(`statuses/show.json?id=${tweetId}&tweet_mode=extended`);

export default useTwitterEndpoint;

export { useUserTweets, useTweet };
