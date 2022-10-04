const Deck = require("../models/Deck");

const DEFAULT_CARDS = ['AS', '2S', '3S', '4S', '5S', '6S', '7S', '8S', '9S', '0S', 'JS', 'QS', 'KS',
    'AD', '2D', '3D', '4D', '5D', '6D', '7D', '8D', '9D', '0D', 'JD', 'QD', 'KD',
    'AC', '2C', '3C', '4C', '5C', '6C', '7C', '8C', '9C', '0C', 'JC', 'QC', 'KC',
    'AH', '2H', '3H', '4H', '5H', '6H', '7H', '8H', '9H', '0H', 'JH', 'QH', 'KH']
const JOKERS = ['X1', 'X2']
const SUITS = { S: 'SPADES', D: 'DIAMONDS', H: 'HEARTS', C: 'CLUBS' } // , 1: 'BLACK', 2: 'RED'
const VALUES = { A: 'ACE', J: 'JACK', Q: 'QUEEN', K: 'KING', 0: '10', X: 'JOKER' }

let shuffle = arr => {
    // Fisher–Yates shuffle
    let a = [...arr]
    let i = arr.length - 1
    let tmp
    while (i >= 0) {
        r = Math.floor(Math.random() * a.length)
        tmp = a[r]
        a[r] = a[i]
        a[i] = tmp
        i -= 1
    }
    return a
}


exports.newDeck = (req, res) => {
    const newDeck = new Deck({ stack: JSON.stringify(DEFAULT_CARDS), deckContent: JSON.stringify(DEFAULT_CARDS), remaining: DEFAULT_CARDS.length, shuffled: false, includeJokers: false })
    newDeck.save((err, success) => {
        if (err) { console.log(err); res.status(500).json("Error") }
        const { shuffled, remaining, _id } = success
        res.json({ success: true, deck_id: _id, remaining, shuffled })
    })
}

exports.newDeckShuffled = (req, res) => {
    const newDeck = new Deck({ stack: JSON.stringify(shuffle(DEFAULT_CARDS)), deckContent: JSON.stringify(DEFAULT_CARDS), remaining: DEFAULT_CARDS.length, shuffled: true, includeJokers: false })
    newDeck.save((err, success) => {
        if (err) { console.log(err); res.status(500).json("Error") }
        const { shuffled, remaining, _id } = success
        res.json({ success: true, deck_id: _id, remaining, shuffled })
    })
}
