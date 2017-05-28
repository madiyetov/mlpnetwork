let HiddenNeuron = require('./neuron').HiddenNeuron,
    OutputNeuron = require('./neuron').OutputNeuron

module.exports = {
    
    Trainer: class Trainer 
    {
        /**
         * @param  {Network} network
         * @param  {[{input: [number], desired: [number]}]} patterns
         * @param  {number} learnRate
         * @returns {[number]}
         */
        train (network, patterns, learnRate = 0.9) 
        {
            let me = this,
                length = network.outputNeurons.length

            if (!network || !patterns) throw Error('provide Network object and patterns')

            // train untill error less than 0.1
            for (let i = 0, errorSum = 1; errorSum > 0.1; i++)
            {
                errorSum = 0

                for (let { input, desired } of patterns) 
                {
                    if (desired.length !== length) 
                        throw new Error(`Desired must have ${length} elements`)

                    // Process network for input pattern
                    let result = network.calculate(input)
                    let outputErrorSum = 0
                    
                    me.calculateError(network, desired)
                    me.calculateDelta (network, learnRate)

                    for (let i=0; i<desired.length; i++) {
                        outputErrorSum += Math.abs(desired[i]-network.outputNeurons[i].activation) 
                    }

                    errorSum += outputErrorSum/length
                }

                console.log(`${i++}.    ${errorSum}`)
            }

            return network.connections.map((conn) => conn.weight)
        }

        /**
         * Calculate delta for every connection
         * 
         * @param {Network} network 
         * @param {number} learnRate 
         */
        calculateDelta (network, learnRate) 
        {
            network.connections.forEach(function(conn) {
                let outputNeuron = conn.output
                conn.weight += learnRate*outputNeuron.error*conn.input.activation
            })
        }

        /**
         * Calculate error function for every neuron
         * 
         * @param {Network} network 
         * @param {[number]} desired 
         */
        calculateError (network, desired) 
        {
            let me = this

            for (let i=0; i<desired.length; i++) {
                let neuron = network.outputNeurons[i]
                neuron.error = me.outputNeuronErrorCalculator.call(neuron, desired[i])
            }

            network.hiddenNeurons.forEach(function(neuron) {
                neuron.error = me.hiddenNeuronErrorCalculator.call(neuron)
            })
        }

        hiddenNeuronErrorCalculator () 
        {
            let me = this,
                sum = 0

            me.outputs.forEach(function(conn) {
                sum += conn.output.error*conn.weight
            }, me)

            return me.deriveActivation()*sum
        }

        outputNeuronErrorCalculator (desired) 
        {
            return this.deriveActivation()*(desired-this.activation)
        }
    }
}