
var parallel = require('../../../parallel.js');
var fs = require('fs');
var source = parallel.readCore(__dirname + "/core.cl");
var kern = parallel.buildProgram(source, "core");
			
			var inputsB = [];
var outputsB = [];


var inputs = [];
var outputs = [];
inputs = parallel.randomFill(100);
outputs = parallel.zeroFill(100);

inputsB = parallel.copy(inputs);
outputsB = parallel.copy(outputs);


parallel.parameter(kern, 0, inputsB);
parallel.parameter(kern, 1, outputsB);

var cq = parallel.run(kern, 1 ,100);
parallel.read(kern,cq,outputsB, outputs);


