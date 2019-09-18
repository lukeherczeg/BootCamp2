/* Add all the required libraries*/
var mongoose = require('mongoose'),
    Listing = require('./ListingSchema.js'),
    config = require('./config');
    Schema = mongoose.Schema,

// Connect to your database using mongoose

/*
   I used useFindAndModify here because there were errors I ran into 
   when I was trying to edit the data in my database that suggested this fix. 
  */
mongoose.connect(config.db.uri, { useNewUrlParser: true, useFindAndModify: false });

var findLibraryWest = function() {
  /* 
    Find the document that contains data corresponding to Library West,
    then log it to the console. 
   */

    //Simply used find() to log the data for Library West.
    Listing.find({ name: 'Library West' }, function (err, listing) {
        if (err)
            throw err;

        console.log(listing);
    });
};
var removeCable = function() {
  /*
    Find the document with the code 'CABL'.
    Remove this listing from your database and log the document to the console. 
   */

    //I used findOne() first to print the data for CABL BEFORE it is deleted.
    Listing.findOne({ code: 'CABL' }, function (err, listing) {
        console.log(listing);
    });

    //Then, I used findOneAndDelete to remove the entry and confirm its removal.
    Listing.findOneAndDelete({ code: 'CABL' }, function (err, listing) {
        if (err)
            throw err;
        console.log("\n\nRemoved the above entry, CABL\n\n");
    });
};
var updatePhelpsLab = function() {
  /*
    Phelps Lab address is incorrect. Find the listing, update it, and then 
    log the updated document to the console. 
   */

    //findOneAndUpdate() is the correct function for this procedure.
    Listing.findOneAndUpdate({ 'name': 'Phelps Laboratory' }, { 'address': '1953 Museum Rd, Gainesville, FL 32603, United States' }, { new: true },
        function (err, listing) {
            if (err)
                throw err;

        console.log("\nThe address of Phelps Laboratory has been updated:\n\n", listing);
    });

};
var retrieveAllListings = function () {
    /* 
    Retrieve all listings in the database, and log them to the console. 
   */
    Listing.find({}, function (err, listing) {
        if (err)
            throw err;

        // To print all values, must use util.inspect and overload maxArrayLength in console.log.
        const util = require('util');
        console.log(util.inspect(listing, { maxArrayLength: null }));
    });
};

findLibraryWest();
removeCable();
updatePhelpsLab();
retrieveAllListings();