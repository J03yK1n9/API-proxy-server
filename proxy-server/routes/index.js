const url = require('url')
const express = require("express");
const router = express.Router();
const needle = require("needle");
const apicache = require('apicache');

// Env vars
const API_BASE_URL = process.env.API_BASE_URL;
const API_ACCESS_NAME = process.env.API_ACCESS_NAME;
const API_ACCESS_VALUE = process.env.API_ACCESS_VALUE;
const API_ID_NAME = process.env.API_ID_NAME;
const API_ID_VALUE = process.env.API_ID_VALUE;
const API_KEY_NAME = process.env.API_KEY_NAME;
const API_KEY_VALUE = process.env.API_KEY_VALUE;

// Init cache
let cache = apicache.middleware

router.get("/", cache('24 day'), async (req, res) => {
  try {
    const params = new URLSearchParams({
      ...url.parse(req.url,true).query,
      [API_ACCESS_NAME]: API_ACCESS_VALUE,
      [API_ID_NAME]: API_ID_VALUE,
      [API_KEY_NAME]: API_KEY_VALUE,
    });

    const apiRes = await needle("get", `${API_BASE_URL}?${params}`);
    const data = apiRes.body;

    // Log the request to the public API
    if(process.env.NODE_ENV !== 'production') {
      console.log(`REQUEST: ${API_BASE_URL}?${params}`);
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error });
  }
});

module.exports = router;
