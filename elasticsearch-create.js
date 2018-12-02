const elasticsearch = require('elasticsearch');
const client = new elasticsearch.Client({
  host: 'aus-search_elasticsearch_1:9200'
});

client.indices.delete({index: 'address'}, ( err, resp, status ) => {
  client.indices.create({
    index: 'address'
  }, ( err, resp, status ) => {
    if (err) {
      console.log(err.message);
    }
    else {
      console.log("Successfully created address index");
    }
  });
});
