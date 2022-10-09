const Bird = require("../models/birdSchema");
const birds_json = require('../public/nzbird.json');
// const birds_json = Bird.find({});
const { bird_sort, search_string } = require('./bird_utils.js');

// get all birds (filtered)
function filter_bird_data(search, status, sort, birdData) {

    var birds = birdData;
    // filter by conservation status 
    if (status !== undefined && status !== "All") {
        birds = birds.filter((b) => b.status == status);
    }
    // filter by search string
    if (search !== undefined && search !== "") {
        birds = search_string(birds, search);
    }
    // sort by
    if (sort !== undefined) {
        birds = bird_sort(birds, sort);
    }

    return birds;
}

module.exports = { filter_bird_data };