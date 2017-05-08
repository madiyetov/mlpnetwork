let HiddenNeuron = require('./neuron').HiddenNeuron,
    OutputNeuron = require('./neuron').OutputNeuron

module.exports = {
    
    Trainer: class Trainer 
    {
        // pattern type of {input: [0, 0], desired: 0}
        constructor (learnRate, patterns) {
            this.learnRate = learnRate
            this.patterns = patterns
        }

        train (network) 
        {
            this.bindErrorFunctions(network)

            // train untill error less than 0.8
            for (let i = 0, errorSum = 1; errorSum > 0.1; i++)
            {
                errorSum = 0

                for (var { input, desired } of this.patterns) {
                    
                    // Execute network for input pattern
                    let result = network.calculate(input)

                    // Calculate error function for every neuron
                    network.outputNeuron.error = network.outputNeuron.calculateError(desired)

                    network.hiddenNeurons.forEach(function(neuron) {
                        neuron.error = neuron.calculateError(desired)
                    }, network)
                    
                    // Calculate delta for every connection
                    network.connections.forEach(function(conn) {
                        var outputNeuron = conn.output
                        conn.delta = this.learnRate*outputNeuron.error*conn.input.activation
                    }, this)

                    // Update weights of every connection with deltas
                    network.connections.forEach(function(conn) {
                        conn.weight += conn.delta
                    }, network)

                    errorSum += Math.abs(desired-network.outputNeuron.activation) 
                }

                console.log(`${i++}.    ${errorSum}`)
            }
        }

        bindErrorFunctions (network) 
        {
            if (OutputNeuron.calculateError) return

            OutputNeuron.prototype.calculateError = this.outputNeuronErrorCalculator        
            HiddenNeuron.prototype.calculateError = this.hiddenNeuronErrorCalculator
        }

        hiddenNeuronErrorCalculator (desired) 
        {
            let sum = 0

            this.outputs.forEach(function(conn) {
                sum += conn.output.calculateError(desired)*conn.weight
            }, this)

            return this.deriveActivation()*sum
        }

        outputNeuronErrorCalculator (desired) 
        {
            return this.deriveActivation()*(desired-this.activation)
        }
    }
}