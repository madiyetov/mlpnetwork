
// Base neuron class for all neurons including Bias and input neurons
class NeuronBase {
    constructor() {
        this.activation = 0;
        this.propagation = 0;
    }
}

// Simple neurons: Input. Bias
class InputNeuron extends NeuronBase {
    constructor(props) {
        super(props);
        this.isInput = true;
        this.outputs = [];
    }
}

class BiasNeuron extends NeuronBase {
    constructor(props) {
        super(props);
        this.isBias = true;
        this.activation = 1;
        this.outputs = [];
    }
}


// Base class for hard neurons: Hidden, Output
class Neuron extends NeuronBase {
    constructor(props) {
        super(props);
    }

    // Activation function - Logistic function
    activate () {
        this.propagate();
        this.activation = 1/(1+Math.exp(-this.propagation));
        return this.activation
    }  

    // Derivation of logistic function
    deriveActivation () {
        return this.activation * (1-this.activation)
    }

    // Propagation function
    propagate () {
        let sum = 0;

        for (let i=0; i<this.inputs.length; i++) { 
            let conn = this.inputs[i];
            sum += conn.weight*conn.input.activation; 
        }
        this.propagation = sum;
        return this.propagation;
    }
}

class OutputNeuron extends Neuron {
    
    constructor(props) {
        super(props);
        this.isOutput = true;
        this.inputs = [];
    }
}

class HiddenNeuron extends Neuron {
    constructor(props) {
        super(props);
        this.isHidden = true;
        this.inputs = [];
        this.outputs = [];
    }
}

module.exports = {
    OutputNeuron: OutputNeuron,
    HiddenNeuron: HiddenNeuron,
    InputNeuron: InputNeuron,
    BiasNeuron: BiasNeuron
}