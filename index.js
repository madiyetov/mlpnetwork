var jsonfile   = require('jsonfile'),
    Network    = require('./api/network').Network;
    
let weights = jsonfile.readFileSync('./data/weights.json')
let network = new Network()

network.createNeurons()
network.setWeights(weights)

let patterns = jsonfile.readFileSync('./data/patterns.json')

for (i=0; i<patterns.length; i++) {
    var pattern = patterns[i];
    console.log(""+pattern.input+"     "+pattern.desired+"    "+network.calculate(pattern.input))
}



