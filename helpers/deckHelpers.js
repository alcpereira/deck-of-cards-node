module.exports = {
    DEFAULT_CARDS: ['AS', '2S', '3S', '4S', '5S', '6S', '7S', '8S', '9S', '0S', 'JS', 'QS', 'KS',
        'AD', '2D', '3D', '4D', '5D', '6D', '7D', '8D', '9D', '0D', 'JD', 'QD', 'KD',
        'AC', '2C', '3C', '4C', '5C', '6C', '7C', '8C', '9C', '0C', 'JC', 'QC', 'KC',
        'AH', '2H', '3H', '4H', '5H', '6H', '7H', '8H', '9H', '0H', 'JH', 'QH', 'KH']
    , JOKERS: ['X1', 'X2']
    , SUITS: { S: 'SPADES', D: 'DIAMONDS', H: 'HEARTS', C: 'CLUBS' } // , 1: 'BLACK', 2: 'RED'
    , VALUES: { A: 'ACE', J: 'JACK', Q: 'QUEEN', K: 'KING', 0: '10', X: 'JOKER' }
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
    }
}