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
            this.outputNeurons = []
            this.biasNeuron = null
            this.connections = []
        }

        /**
         * Builds network
         * 
         * @param {number} inputs 
         * @param {number} hiddens 
         * @param {number} outputs 
         */
        buildNetwork(inputs, hiddens, outputs) {
            this.createNeurons(inputs, hiddens, outputs)
            this.connectNeurons()         
        }

        createNeurons(inputs, hiddens, outputs) {

            this.inputNeurons  = Array.from(new Array(inputs), () => new InputNeuron())
            this.hiddenNeurons = Array.from(new Array(hiddens), () => new HiddenNeuron())
            this.outputNeurons = Array.from(new Array(outputs), () => new OutputNeuron())
            this.biasNeuron = new BiasNeuron() 
        }

        connectNeurons() {

            // connecting hidden neurons
            this.hiddenNeurons.forEach((hidden) => {

                this.inputNeurons.forEach((input) => {                             // with the input neurons
                    this.connections.push(new Connection(input, hidden))
                })

                this.outputNeurons.forEach((output) => {                           // with the output neurons
                    this.connections.push(new Connection(hidden, output))
                })

                this.connections.push(new Connection(this.biasNeuron, hidden))     // with the bias neurons
            
            }, this)

            // connecting bias neuron with the output neurons
            this.outputNeurons.forEach((output) => {
                this.connections.push(new Connection(this.biasNeuron, output))
            }, this)
        }

        /**
         * Calculates the output for given input
         * 
         * @param {[number]} inputs
         * @returns {[number]} 
         */
        calculate(inputs) {
            let length = this.inputNeurons.length

            if (inputs.length !== length) 
                throw new Error(`Pattern must have ${length} inputs for ${length} input neurons`)

            for (let i=0; i<length; i++) {
                this.inputNeurons[i].activation = inputs[i]
            }

            this.hiddenNeurons.forEach(function(hidden) {
                hidden.activate()
            }, this)
            
            return this.outputNeurons.map((output) => output.activate())
        }

        /**
         * Sets the predefined weights
         * 
         * @param {[number]} weights 
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