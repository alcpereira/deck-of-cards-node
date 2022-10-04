const mongoose = require("mongoose");

const DeckSchema = new mongoose.Schema({
    stack: {
        type: String,
        require: true,
    },
    deckContent: {
        type: String,
        require: true,
    },
    shuffled: {
        type: Boolean,
        required: true,
    },
    remaining: {
        type: Number,
        require: true,
    },
    includeJokers: {
        type: Boolean,
        require: true,
    }
});

module.exports = mongoose.model("Deck", DeckSchema);