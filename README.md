# Deck of Cards API
Implementation using Node/Express/MongoDB  
[Original Website](deckofcardsapi.com)  
[Original Github](https://github.com/crobertsbmw/deckofcards)

## TODO
- [x] Setup basic Express
- [x] Insert features from original API into the TODOs
- [x] Structure as MVC
- [x] Implement MongoDB
- [x] Implement Mongoose
- [x] Add static files
- [x] Implement Mongoose Schemas
- [x] Add static files
- [ ] Make docs

## Main features
- [x] /api/deck/new/ - Create a non-shuffled new deck | Order: Ace, 2, 3... - Spades, diamonds, clubs, then hearts
- [x] /api/deck/new/shuffle/ - Create a shuffled new deck
- [x] /api/deck/:deck_id/shuffle/ - Shuffle an existing deck
- [x] /api/deck/:deck_id/draw/?count=:count - Draw cards
- [ ] /api/deck/new/draw/?count=:count - Draw cards out of new deck

## Improvements
- [ ] Option for jokers
- [ ] Partial decks
- [ ] Handling piles
- [ ] Return cards to deck
- [ ] Option for multiple decks
- [ ] Autodeletion of decks from DB (with no action)
- [ ] Feature for other types of decks