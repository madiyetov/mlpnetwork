module.exports = {
    Connection: class Connection {
        constructor (input, output) {
            this.weight = Math.random();
            this.delta = 0;
            this.input = input;
            this.output = output;

            input.outputs.push(this);
            output.inputs.push(this); 
        }
    }
}