# Simple MLP. Written in ES6.

## Usage

#### 1. Create new Network and Trainer objects.

```
let network = new Network(),
    trainer = new Trainer(learnRate, patterns)
```

```learnRate``` is an integer.
```patterns``` is an array of patterns every of which contains input and desired values 
```
[
  {
    "input": [ 0, 0 ],
    "desired": [ 0 ]
  }
]
```
#### 2. Build network.
```
network.buildNetwork(2, 3, 1)
```

```buildNetwork``` accepts amounts of input, hidden and output neurons.

#### 3. Train network
```
let weights = trainer.train(network)
```
```train``` method returns ```weights```. You can save it to the file as json. You can use it next time simply passing to ```setWeights``` method of ```Network``` class.

#### 4. Use it
```
network.calculate(input)
```
