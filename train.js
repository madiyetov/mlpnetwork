var jsonfile   = require('jsonfile'),
    Network    = require('./api/network').Network,
    Trainer    = require('./api/trainer').Trainer;
    
const learnRate = 0.9;

let patterns = jsonfile.readFileSync('./data/patterns.json')

let network = new Network()
let trainer = new Trainer(learnRate, patterns)
let weights = []

network.createNeurons()

for (var i=0; i<3000; i++) {
    trainer.train(network);
}

network.connections.forEach((conn) => {
    weights.push(conn.weight)
})

jsonfile.writeFile('./data/weights.json', weights, { spaces: 2 }, (err) => {
    if (err) throw err;
    console.log('Weights has been saved!');
})