const Deck = require("../models/Deck");
const { DEFAULT_CARDS, JOKERS, SUITS, VALUES, shuffle } = require('../helpers/deckHelpers')

module.exports = {
    newDeck: async (req, res) => {
        const newDeck = new Deck({
            stack: JSON.stringify(DEFAULT_CARDS),
            deckContent: JSON.stringify(DEFAULT_CARDS),
            remaining: DEFAULT_CARDS.length,
            shuffled: false,
            includeJokers: false
        })
        try {
            let success = await newDeck.save()
            const { shuffled, remaining, _id } = success
            res.json({ success: true, deck_id: _id, remaining, shuffled })
            console.log(`🃏 New deck created ${_id}`)
        } catch (err) {
            console.log(err)
            res.status(500).json("Error")
        }
    },
    newDeckShuffled: async (req, res) => {
        const newShuffledDeck = new Deck({
            stack: JSON.stringify(shuffle(DEFAULT_CARDS)),
            deckContent: JSON.stringify(DEFAULT_CARDS),
            remaining: DEFAULT_CARDS.length,
            shuffled: true,
            includeJokers: false
        })
        try {
            let success = await newShuffledDeck.save()
            const { shuffled, remaining, _id } = success
            res.json({ success: true, deck_id: _id, remaining, shuffled })
            console.log(`🃏 New shuffled deck created ${_id}`)

        } catch (err) {
            console.log(err)
            res.status(500).json("Error")
        }
    }
}