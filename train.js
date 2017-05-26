let jsonfile   = require('jsonfile'),
    Network    = require('./api/network').Network,
    Trainer    = require('./api/trainer').Trainer
    
let learnRate = 0.9,
    network = new Network(),
    patterns = jsonfile.readFileSync('./data/patterns.json'),
    trainer = new Trainer(learnRate, patterns)

network.buildNetwork(2, 3, 1)

// Training process of the network
let weights = trainer.train(network)

jsonfile.writeFile('./data/weights.json', weights, { spaces: 3 }, (err) => {
    if (err) throw err
    console.log('Weights has been saved!')
})