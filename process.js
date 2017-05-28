let jsonfile   = require('jsonfile'),
    Network    = require('./api/network').Network

let patterns = jsonfile.readFileSync('./data/patterns.json')    
let weights = jsonfile.readFileSync('./data/weights.json')
let network = new Network(2, 3, 1)

// Initialize neural networks weights
network.setWeights(weights)

for (let pattern of patterns) {
    console.log(`${pattern.input}      ${pattern.desired}       ${network.calculate(pattern.input)}`)
}