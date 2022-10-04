const mongoose = require("mongoose")
const Deck = require("../models/Deck");
const { DEFAULT_CARDS, JOKERS, shuffle, prettifyArray } = require('../helpers/deckHelpers')

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
            let { shuffled, remaining, _id } = success
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
            let { shuffled, remaining, _id } = success
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
            return
        }
        try {
            let deckUpdate = await Deck.findById(req.params.id).exec()
            deckUpdate.stack = JSON.stringify(shuffle(JSON.parse(deckUpdate.stack)))
            deckUpdate.shuffled = true
            let savedDeck = await deckUpdate.save()
            let { shuffled, remaining, _id } = savedDeck
            res.json({ success: true, deck_id: _id, remaining, shuffled })
            console.log(`🃏 Existing deck shuffled [id: ${_id}]`)
        } catch (err) {
            res.status(404).json(`Deck id not found: ${req.params.id}`)
            console.log(`❌ Deck id not found: ${req.params.id}`)
        }

    },
    existingDeckDraw: async (req, res) => {
        // req.query (object)
        if (req.params.id.length !== 24) {
            res.status(500).json(`Invalid id: ${req.params.id}`)
            console.log(`❌ Invalid id: ${req.params.id}`)
            return
        }

        try {
            let n
            if (req.query.hasOwnProperty('count')) {
                n = Number(req.query.count)
                if (isNaN(n) || n <= 0) {
                    res.status(500).json(`Invalid count: ${req.query.count}`)
                    console.log(`❌ Invalid count: ${req.query.count}`)
                    return
                }
            } else {
                n = 1
            }

            let deckUpdate = await Deck.findById(req.params.id).exec()
            let { stack, shuffled, remaining, _id } = deckUpdate
            if (n > remaining) { n = remaining }
            stack = JSON.parse(stack)
            let out = []
            for (let i = 0; i < n; i++) {
                out.push(stack.shift())
            }
            deckUpdate.stack = JSON.stringify(stack)
            deckUpdate.remaining = stack.length
            let savedDeck = await deckUpdate.save()
            res.json({ success: true, deck_id: _id, remaining: savedDeck.remaining, shuffled, cards: prettifyArray(out) })
            console.log(`🃏 Drawn cards [id: ${_id}]`)
        } catch (err) {
            console.log(err)
            res.status(404).json(`Deck id not found: ${req.params.id}`)
            console.log(`❌ Deck id not found: ${req.params.id}`)
        }

    }
}