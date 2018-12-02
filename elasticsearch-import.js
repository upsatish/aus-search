const db = require('./utils/db.js');
const elasticsearch = require('elasticsearch');
const client = new elasticsearch.Client({
  host: 'aus-search_elasticsearch_1:9200'
});

db( db => {
  const cursor = db.collection( 'AddressSimple' ).find({});
  getNext( cursor, () => {
    /* Check to see if there is any more left in the batch */
    if ( batch.length > 0 ) {
      insertDocs( batch, () => {
        batch = [];
        console.log( 'Completed' );
        db.close();
      });
    } else {
      console.log( 'Completed' );
      db.close();
    }
  });
});

let batch = [];
let count = 0;

getNext = ( cursor, callback ) => {
  cursor.nextObject( (err, doc) => {
    if ( err || !doc ) {
      callback();
      return;
    }

    if ( batch.length < 1000 ) {
      batch.push( doc );
      getNext( cursor, callback );
    } else {
      insertDocs( batch, () => {
        batch = [];
        getNext( cursor, callback );
      });
    }
  });
}

insertDocs = ( docs, callback ) => {
  const batchData = [];
  let left = docs.length;
  docs.forEach( ( doc, i ) => {
    delete doc._id;
    batchData.push({
      index: {
        _index: "address",
        _type: "singleAddress",
      }
    });
    batchData.push( doc );
  });

  client.bulk({
    body: batchData
  }, ( err, resp, status ) => {
    count+= docs.length;
    if ( count % 1000 === 0 ) {
      process.stdout.clearLine();
      process.stdout.cursorTo(0);
      process.stdout.write( `${count} records imported` );
    }
    callback();
  });
}
