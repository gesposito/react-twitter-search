const https = require("https");

const hostname = "api.twitter.com";

const bearer = process.env.TWITTER_TOKEN;

function get(path) {
  const options = {
    hostname,
    path: `/1.1/${path}`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${bearer}`
    }
  };

  return new Promise((resolve, reject) => {
    const request = https.request(options, response => {
      let body = "";

      response.on("data", data => (body += data));
      response.on("end", () => resolve(body));
    });

    request.on("error", error => reject(error));
    request.end();
  });
}

module.exports = async (req, res) => {
  const path = decodeURIComponent(req.url);
  const proxiedPath = path.split("/api/node?path=")[1];

  const response = await get(proxiedPath);
  res.end(response);
};
