let NeuronBase = require('./neuron-base'),
    ComplexNeuronBase = require('./complex-neuron-base')


/**
 * @class InputNeuron
 * @extends {NeuronBase}
 */
class InputNeuron extends NeuronBase {
    constructor(props) {
        super(props)
        this.isInput = true
        this.outputs = []
    }
}

/**
 * @class BiasNeuron
 * @extends {NeuronBase}
 */
class BiasNeuron extends NeuronBase {
    constructor(props) {
        super(props)
        this.isBias = true
        this.activation = 1
        this.outputs = []
    }
}

/**
 * @class OutputNeuron
 * @extends {ComplexNeuronBase}
 */
class OutputNeuron extends ComplexNeuronBase 
{
    constructor(props) {
        super(props)
        this.isOutput = true
        this.inputs = []
    }
}

/**
 * @class HiddenNeuron
 * @extends {ComplexNeuronBase}
 */
class HiddenNeuron extends ComplexNeuronBase {
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