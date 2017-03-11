module.exports = {
    
    Trainer: class Trainer 
    {
        // pattern type of {input: [0, 0], desired: 0}
        constructor (learnRate, patterns) {
            this.learnRate = learnRate
            this.patterns = patterns
        }

        train (network) {
            for (var {input: [i1, i2], desired} of this.patterns) {
                network.calculate([i1, i2]);
                
                network.outputNeuron.error = network.outputNeuron.calculateError(desired);
                network.hiddenNeurons.forEach(function(neuron) {
                    neuron.error = neuron.calculateError(desired);
                }, network);
                
                network.connections.forEach(function(conn) {
                    var outputNeuron = conn.output;
                    conn.delta = this.learnRate*outputNeuron.error*conn.input.activation;
                }, this);

                network.connections.forEach(function(conn) {
                    conn.weight += conn.delta;
                }, network);
            }
        }
    }
}