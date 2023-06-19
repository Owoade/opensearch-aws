const { Client } = require("@opensearch-project/opensearch/");
const { config } = require("dotenv");

config();

const SERVICE_URL = process.env.SERVICE_URL;

module.exports.client = new Client({
    node: SERVICE_URL
 })
