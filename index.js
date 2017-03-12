let jsonfile   = require('jsonfile'),
    Network    = require('./api/network').Network;

let patterns = jsonfile.readFileSync('./data/patterns.json')    
let weights = jsonfile.readFileSync('./data/weights.json')
let network = new Network()

// Create and initialize neural network
network.createNeurons()
network.setWeights(weights)

for (i=0; i<patterns.length; i++) {
    let pattern = patterns[i];
    console.log(""+pattern.input+"     "+pattern.desired+"    "+network.calculate(pattern.input))
}



