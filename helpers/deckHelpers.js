const SUITS = { S: 'SPADES', D: 'DIAMONDS', H: 'HEARTS', C: 'CLUBS' } // , 1: 'BLACK', 2: 'RED'
const VALUES = { A: 'ACE', J: 'JACK', Q: 'QUEEN', K: 'KING', 0: '10', X: 'JOKER' }

module.exports = {
    DEFAULT_CARDS: ['AS', '2S', '3S', '4S', '5S', '6S', '7S', '8S', '9S', '0S', 'JS', 'QS', 'KS',
        'AD', '2D', '3D', '4D', '5D', '6D', '7D', '8D', '9D', '0D', 'JD', 'QD', 'KD',
        'AC', '2C', '3C', '4C', '5C', '6C', '7C', '8C', '9C', '0C', 'JC', 'QC', 'KC',
        'AH', '2H', '3H', '4H', '5H', '6H', '7H', '8H', '9H', '0H', 'JH', 'QH', 'KH']
    , JOKERS: ['X1', 'X2']

    , shuffle: arr => {
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
    }, prettifyArray: arr => {
        let out = []
        arr.forEach(e => {
            let o = {
                code: e,
                image: `https://raw.githubusercontent.com/alcpereira/deck-of-cards-node/main/public/images/${e}.png`,
                images: {
                    svg: `https://raw.githubusercontent.com/alcpereira/deck-of-cards-node/main/public/images/${e}.svg`,
                    png: `https://raw.githubusercontent.com/alcpereira/deck-of-cards-node/main/public/images/${e}.png`
                },
                value: VALUES.hasOwnProperty(e[0]) ? VALUES[e[0]] : Number(e[0]),
                suit: SUITS[e[1]]
            }
            out.push(o)
        })
        return out
    }
}

let obj = [{
    "code": "0D",
    "image": "https://deckofcardsapi.com/static/img/0D.png",
    "images": { "svg": "https://deckofcardsapi.com/static/img/0D.svg", "png": "https://deckofcardsapi.com/static/img/0D.png" },
    "value": "10",
    "suit": "DIAMONDS"
},

{ "code": "QC", "image": "https://deckofcardsapi.com/static/img/QC.png", "images": { "svg": "https://deckofcardsapi.com/static/img/QC.svg", "png": "https://deckofcardsapi.com/static/img/QC.png" }, "value": "QUEEN", "suit": "CLUBS" }]