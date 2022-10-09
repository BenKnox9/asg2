const mongoose = require("mongoose");

const photoSchema = new mongoose.Schema({
    credit: { type: String, required: true },
    source: { type: String, required: true },
})




const birdSchema = new mongoose.Schema({

    // _id: mongoose.Schema.Types.ObjectId,
    primary_name: { type: String, required: true },
    english_name: { type: String, required: true },
    scientific_name: { type: String, required: true },
    order: { type: String, required: true },
    family: { type: String, required: true },
    other_names: { type: [String], required: false },
    status: { type: String, required: true },
    photo: {
        credit: { type: String, required: true },
        source: { type: String, required: true },
    },
    size: {
        length: {
            value: { type: Number },
            units: { type: String },
        },
        weight: {
            value: { type: Number },
            units: { type: String },
        },

    },

}, { collection: 'birds' },
);



const Bird = mongoose.model('bird', birdSchema);

module.exports = Bird;