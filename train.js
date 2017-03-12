let jsonfile   = require('jsonfile'),
    Network    = require('./api/network').Network,
    Trainer    = require('./api/trainer').Trainer;
    
let learnRate = 0.9;

let patterns = jsonfile.readFileSync('./data/patterns.json')

let network = new Network()
let trainer = new Trainer(learnRate, patterns)
let weights = []

network.createNeurons()

for (let i=0; i<2000; i++) {
    trainer.train(network);
    
    if (i === 1700) {
        learnRate = 0.7
    }
}

network.connections.forEach((conn) => {
    weights.push(conn.weight)
})

jsonfile.writeFile('./data/weights.json', weights, { spaces: 3 }, (err) => {
    if (err) throw err;
    console.log('Weights has been saved!');
})