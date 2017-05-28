
/**
 * Base neuron class for all neurons including Bias and input neurons
 * 
 * @class NeuronBase
 */
class NeuronBase {
    constructor() {
        this.activation = 0
        this.propagation = 0
    }
}
/**
 * Simple neurons: Input. Bias
 * 
 * @class InputNeuron
 */
class InputNeuron extends NeuronBase {
    constructor(props) {
        super(props)
        this.isInput = true
        this.outputs = []
    }
}

class BiasNeuron extends NeuronBase {
    constructor(props) {
        super(props)
        this.isBias = true
        this.activation = 1
        this.outputs = []
    }
}

/**
 * Base class for hard neurons: Hidden, Output
 * 
 * @class Neuron
 */
class Neuron extends NeuronBase {
    constructor(props) {
        super(props)
    }

    /**
     * Activation function - Logistic function
     * 
     * @returns {number}
     * 
     * @memberof Neuron
     */
    activate () {
        let me = this

        me.propagate()
        me.activation = 1/(1+Math.exp(-me.propagation))
        
        return me.activation
    }  

    /**
     * Derivation of logistic function
     * 
     * @returns {number}
     * 
     * @memberof Neuron
     */
    deriveActivation () {
        return this.activation * (1-this.activation)
    }

    /**
     * Propagation function
     * 
     * @returns {number}
     * 
     * @memberof Neuron
     */
    propagate () {
        let me = this

        me.propagation = 0

        for (let conn of me.inputs) { 
            me.propagation += conn.weight*conn.input.activation 
        }

        return me.propagation
    }
}

class OutputNeuron extends Neuron 
{
    constructor(props) {
        super(props)
        this.isOutput = true
        this.inputs = []
    }
}

class HiddenNeuron extends Neuron {
    constructor(props) {
        super(props)
        this.isHidden = true
        this.inputs = []
        this.outputs = []
    }
}

module.exports = {
    OutputNeuron : OutputNeuron,
    HiddenNeuron : HiddenNeuron,
    InputNeuron  : InputNeuron,
    BiasNeuron   : BiasNeuron
}