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

            // creating all neurons
            this.inputNeurons.push(new InputNeuron(), new InputNeuron())
            this.hiddenNeurons.push(new HiddenNeuron(), new HiddenNeuron())
            this.outputNeuron = new OutputNeuron()
            this.biasNeuron = new BiasNeuron()

            // connecting hidden neurons
            this.hiddenNeurons.forEach((neuron) => {
                this.connections.push(new Connection(this.inputNeurons[0], neuron),
                                      new Connection(this.inputNeurons[1], neuron),
                                      new Connection(neuron, this.outputNeuron),
                                      new Connection(this.biasNeuron, neuron))
            }, this)

            // connecting bias neuron with the output neuron
            this.connections.push(new Connection(this.biasNeuron, this.outputNeuron))
        }

        /**
         * Calculates the output for given input
         * 
         * @param {[number, number]} input 
         * @returns {number} 
         */
        calculate(input) {
            this.inputNeurons[0].activation = input[0]
            this.inputNeurons[1].activation = input[1]

            this.hiddenNeurons.forEach(function(element) {
                element.activate()
            }, this)
            
            return this.outputNeuron.activate()
        }
        /**
         * Sets the predefined weights
         * 
         * @param {[number, number]} weights 
         */
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