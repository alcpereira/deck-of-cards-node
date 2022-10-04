const express = require("express")
const router = express.Router()
const deckController = require("../controllers/deckController")

router.get("/new", deckController.newDeck)
router.get("/new/shuffle", deckController.newDeckShuffled)
router.get("/:id/shuffle", deckController.existingDeckShuffle)
router.get("/:id/draw", deckController.existingDeckDraw)

module.exports = router