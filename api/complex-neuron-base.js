let NeuronBase = require('./neuron-base')

/**
 * Abstract neuron class for complex neurons: Hidden, Output
 * 
 * @class ComplexNeuronBase
 */
module.exports = class ComplexNeuronBase extends NeuronBase {
    constructor(props) {
        super(props)

        if (new.target === ComplexNeuronBase) {
            throw new TypeError("Can not create abstract class Neuron");
        }
    }

    /**
     * Activation function - Logistic function
     * 
     * @returns {number}
     * 
     * @memberof ComplexNeuronBase
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
     * @memberof ComplexNeuronBase
     */
    deriveActivation () {
        return this.activation * (1-this.activation)
    }

    /**
     * Propagation function
     * 
     * @returns {number}
     * 
     * @memberof ComplexNeuronBase
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