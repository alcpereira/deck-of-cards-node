const mongoose = require("mongoose");

const CARDS = ['AS', '2S', '3S', '4S', '5S', '6S', '7S', '8S', '9S', '0S', 'JS', 'QS', 'KS',
    'AD', '2D', '3D', '4D', '5D', '6D', '7D', '8D', '9D', '0D', 'JD', 'QD', 'KD',
    'AC', '2C', '3C', '4C', '5C', '6C', '7C', '8C', '9C', '0C', 'JC', 'QC', 'KC',
    'AH', '2H', '3H', '4H', '5H', '6H', '7H', '8H', '9H', '0H', 'JH', 'QH', 'KH']


const DeckSchema = new mongoose.Schema({
    stack: {
        type: String,
        require: true,
        default: JSON.stringify(CARDS)
    },
    deckContent: {
        type: String,
        require: true,
        default: JSON.stringify(CARDS)
    },
    shuffled: {
        type: Boolean,
        required: true,
        default: false
    },
    remaining: {
        type: Number,
        require: true,
        default: 52
    },
    includeJokers: {
        type: Boolean,
        require: true,
        default: false
    }
});

module.exports = mongoose.model("Deck", DeckSchema);