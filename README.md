# Multilayer Perceptron. Simple neural network. Written in ES6 (Javascript).

## Usage

#### 1. Create new Network and Trainer objects.

```
let network = new Network(2, 3, 1),
    trainer = new Trainer()
```
```Network``` constructor accepts amounts of input, hidden and output neurons.

#### 2. Train network

```
let weights = trainer.train(network, patterns[, learnRate])
```
```train``` method returns ```weights```. Save it to the file as json then next time you can use it simply passing to ```setWeights``` method of ```Network``` class. ```patterns``` is an array of patterns, contains input and desired values for each inputs and outputs: 
```
[
  {
    "input": [ 0, 0 ],
    "desired": [ 0 ]
  }
]
```

#### 3. Use

```
network.calculate(input)
```
```input``` object must be the same as input property of the pattern used in training

#### P.S.

See ```train.js``` as an example of training. Run ```node train.js``` and it will save calculated weights to the file. Then run ```node process.js``` and it will execute neural network using calculated weights.
