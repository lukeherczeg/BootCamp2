'use strict';
/* 
  Import modules/files you may need to correctly run the script. 
  Make sure to save your DB's uri in the config file, then import it with a require statement!
 */
var fs = require('fs'),
    mongoose = require('mongoose'), 
    Schema = mongoose.Schema, 
    Listing = require('./ListingSchema.js'), 
    config = require('./config');

/* Connect to your database using mongoose - remember to keep your key secret*/

//config.db.uri is what I used to keepy my key hidden.
mongoose.connect(config.db.uri, { useNewUrlParser: true });

/* 
  Instantiate a mongoose model for each listing object in the JSON file, 
  and then save it to your Mongo database 
 */
fs.readFile('listings.json', 'utf8', function(err, data) {
    if (err)
        throw err;

    //Parsed the data and put it in listingContent, which I then loop through to save each as data in Mongo.
    var listingContent = JSON.parse(data);
    listingContent.entries.forEach(function (listing) {
        new Listing(listing).save();
    });
});