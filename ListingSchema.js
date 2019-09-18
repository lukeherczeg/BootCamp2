/* Import mongoose and define any variables needed to create the schema */
var mongoose = require('mongoose'), 
    Schema = mongoose.Schema;

//Create your schema for the data in the listings.json file that will define how data is saved in your database

var listingSchema = new Schema({
    /* Your code for a schema here */

    /*
      I made the code and name required to force uniqueness on the data, so that I didn't overpopulate
      the database while testing it.
     */
    code: { type: String, required: true },
    name: { type: String, required: true },
    coordinates: {
        latitude: Number,
        longitude: Number
    },
    address: String
});

// Create a 'pre' function that adds the updated_at (and created_at if not already there) property 

listingSchema.pre('save', function(next) {
    // Used thisDate to add the required properties.
    var thisDate = new Date();
    this.updated_at = thisDate;

    if(!this.created_at) {
        this.created_at = thisDate;
    }

    //Need the next() function to continue.
    next();
});

/* Use your schema to instantiate a Mongoose model */
var Listing = mongoose.model('Listing', listingSchema);

/* Export the model to make it avaiable to other parts of your Node application */
module.exports = Listing;
