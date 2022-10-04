const Deck = require("../models/Deck");

exports.newDeck = (req, res) => {
    const newDeck = new Deck().save((err, success) => {
        if (err) { console.log(err); res.status(500).json("Error") }
        const { shuffled, remaining, _id } = success
        res.json({ success: true, deck_id: _id, remaining, shuffled })
    })
}

