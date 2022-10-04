const express = require("express")
const router = express.Router()
const deckController = require("../controllers/deckController")

router.get("/new", deckController.newDeck)
router.get("/new/shuffle", deckController.newDeckShuffled)

module.exports = router