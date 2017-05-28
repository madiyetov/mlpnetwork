/**
 * Abstract neuron class for all neurons including Bias and input neurons
 * 
 * @class NeuronBase
 */
module.exports = class NeuronBase {
    constructor() {
        if (new.target === NeuronBase) {
            throw new TypeError("Can not create abstract class NeuronBase");
        }

        this.activation = 0
        this.propagation = 0
    }
}