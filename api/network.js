let InputNeuron  = require('./neuron').InputNeuron,
    HiddenNeuron = require('./neuron').HiddenNeuron,
    OutputNeuron = require('./neuron').OutputNeuron,
    BiasNeuron   = require('./neuron').BiasNeuron,
    Connection   = require('./connection').Connection

module.exports = 
{
    Network: class Network {
        constructor() {
            this.inputNeurons = []
            this.hiddenNeurons = []
            this.outputNeuron = null
            this.biasNeuron = null
            this.connections = []
        }

        createNeurons() {
            this.inputNeurons.push(new InputNeuron())
            this.inputNeurons.push(new InputNeuron())

            this.hiddenNeurons.push(new HiddenNeuron())
            this.hiddenNeurons.push(new HiddenNeuron())

            this.outputNeuron = new OutputNeuron()
            this.biasNeuron = new BiasNeuron()

            this.hiddenNeurons.forEach((neuron) => {
                this.connections.push(new Connection(this.inputNeurons[0], neuron))
                this.connections.push(new Connection(this.inputNeurons[1], neuron))
                this.connections.push(new Connection(neuron, this.outputNeuron))
                this.connections.push(new Connection(this.biasNeuron, neuron))
            }, this)

            this.connections.push(new Connection(this.biasNeuron, this.outputNeuron))
        }

        // input type of [0,0]
        calculate(input) {
            this.inputNeurons[0].activation = input[0]
            this.inputNeurons[1].activation = input[1]

            this.hiddenNeurons.forEach(function(element) {
                element.activate()
            }, this)

            return this.outputNeuron.activate()
        }

        setWeights(weights) {
            let len = weights.length 
            
            if (len !== this.connections.length) {
                throw Error("not all weights set. Amount of weights must be equal to connections")
            }

            for (let i=0; i<len; i++) {
                this.connections[i].weight = weights[i]
            }
        }
    }
}