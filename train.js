let jsonfile   = require('jsonfile'),
    Network    = require('./api/network').Network,
    Trainer    = require('./api/trainer').Trainer
    
let patterns = jsonfile.readFileSync('./data/patterns.json'),
    network = new Network(2, 3, 1),
    trainer = new Trainer()

// Training process of the network
let weights = trainer.train(network, patterns)

jsonfile.writeFile('./data/weights.json', weights, { spaces: 3 }, (err) => {
    if (err) throw err
    console.log('Weights has been saved!')
})