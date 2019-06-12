/*
  Small utility for

  ---
  https://developer.twitter.com/en/docs/basics/authentication/overview/application-only

  The request must include an Authorization header with the value of Basic <base64 encoded value from step 1>.
  The request must include a Content-Type header with the value of application/x-www-form-urlencoded;charset=UTF-8.
  The body of the request must be grant_type=client_credentials.
  ---

  Use it like so:
  node api/node/credentials.js xvz1evFS4wEEPTGEFPHBog L8qq9PZyRg6ieKGEKhZolGC0vJWLw8iEJ88DRdyOg

  Note: these values are fake, retrieve yours from https://developer.twitter.com/en/apps

*/

const https = require("https");

const [_path, _script, key, secret] = process.argv;

function btoa(string) {
  return Buffer.from(string).toString("base64");
}

const bearer = btoa(`${encodeURIComponent(key)}:${encodeURIComponent(secret)}`);

const options = {
  hostname: "api.twitter.com",
  path: "/oauth2/token?grant_type=client_credentials",
  method: "POST",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    Authorization: `Basic ${bearer}`
  }
};

const request = https.request(options, response => {
  let body = "";

  response.on("data", data => (body += data));
  response.on("end", () => console.info(body));
});

request.on("error", e => console.error(e));
request.end();
