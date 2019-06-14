This repo has been bootstrapped from
https://github.com/zeit/now-examples/tree/master/monorepo

# API

`api/node/index.js` will serve as a Proxy for your Twitter API so you don't have to expose your credentials on the client.

In order to retrieve your [application-only](https://developer.twitter.com/en/docs/basics/authentication/overview/application-only) token you can use this shortcut:
```
node api/node/credentials.js xvz1evFS4wEEPTGEFPHBog L8qq9PZyRg6ieKGEKhZolGC0vJWLw8iEJ88DRdyOg
```
Note: these values are fake, retrieve yours from [here](https://developer.twitter.com/en/apps).

# Dev

Fill the token retrieved from the command above into `.env` file.

Run the local env with
```
now dev
```

## Tests
```
cd www && yarn run cypress-open
```

# Prod 

Add the secret to your [now](https://zeit.co/now) account with
```
now secret add twitter-token eHZ6MWV2RlM0d0VFUFRHRUZQSEJvZzpMOHFxOVBaeVJnNmllS0dFS2hab2xHQzB2SldMdzhpRUo4OERSZHlPZw==
```
Note: these values are fake, retrieve yours from the script above.

Deploy with
```
now
```