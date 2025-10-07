const express = require("express");
const morgan = require("morgan");
const apicache = require("apicache");
const axios = require("axios");
const jsonFeedToRSS = require("jsonfeed-to-rss");

const IS_PRODUCTION = process.env.NODE_ENV === "production";

const CACHE_DURATION = process.env.CACHE_DURATION ?? "15 minutes";

const app = express();

app.use(morgan(IS_PRODUCTION ? "common" : "dev"));

if (!IS_PRODUCTION) {
  apicache.options({ debug: true });
}
let cache = apicache.middleware;

const cacheSuccesses = cache(CACHE_DURATION, (req, res) => {
  return res.statusCode === 200;
});

app.get("/json-feed-to-rss", cacheSuccesses, async (req, res, next) => {
  const url = req.query["url"];
  if (typeof url === "string" && url) {
    try {
      const response = await axios.get(url);
      const rssFeed = jsonFeedToRSS(response.data);
      res.set("Content-Type", "application/rss+xml");
      res.send(rssFeed);
    } catch (err) {
      next(err);
    }
  } else {
    res.status(400).json({ status: 400, reason: "url empty or not found" });
  }
});

app.use((req, res, next) => {
  res.status(404).json({ status: 404 });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ status: 500, reason: err.message });
});

app.listen(3000, function (error) {
  if (error) {
    throw error
  }
  var port = process.env.PORT || 3000;
  console.log(`Server is running on port ${port}`);
});
