const { client } = require("./client");
const { data } = require("./data");
const OpenSearchService = require("./opensearch");

const openSearch = new OpenSearchService();

(async function(){
  
   const response = await openSearch.search("Apple", "products", "product_name")

   console.log(response.hits.hits)

})()

