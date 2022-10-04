const mongoose = require("mongoose")
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
            console.log(`🃏 New deck created [id: ${_id}]`)
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
            console.log(`🃏 New shuffled deck created [id: ${_id}]`)

        } catch (err) {
            console.log(err)
            res.status(500).json("Error")
        }
    },
    existingDeckShuffle: async (req, res) => {
        if (req.params.id.length !== 24) {
            res.status(500).json(`Invalid id: ${req.params.id}`)
            console.log(`❌ Invalid id: ${req.params.id}`)
        } else {
            const deckId = mongoose.Types.ObjectId(req.params.id)
            try {
                let deckUpdate = await Deck.findById(deckId).exec()
                deckUpdate.stack = JSON.stringify(shuffle(JSON.parse(deckUpdate.stack)))
                deckUpdate.shuffled = true
                let savedDeck = await deckUpdate.save()
                const { shuffled, remaining, _id } = savedDeck
                res.json({ success: true, deck_id: _id, remaining, shuffled })
                console.log(`🃏 Existing deck shuffled [id: ${_id}]`)
            } catch (err) {
                res.status(404).json(`Deck id not found: ${req.params.id}`)
                console.log(`❌ Deck id not found: ${req.params.id}`)
            }
        }
    }
}