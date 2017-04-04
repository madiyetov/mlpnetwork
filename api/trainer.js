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

            for (var {input: [i1, i2], desired} of this.patterns) {
                
                // Execute network for input pattern
                network.calculate([i1, i2])
                
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
            }
        }

        bindErrorFunctions (network) 
        {
            if (network.outputNeuron.calculateError) return

            network.outputNeuron.calculateError = this.outputNeuronErrorCalculator        
            network.hiddenNeurons[0].__proto__.calculateError = this.hiddenNeuronErrorCalculator
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