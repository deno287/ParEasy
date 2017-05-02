var parallel = require('../../../parallel.js');
var fs = require('fs');
var source = parallel.readCore(__dirname + "/core.cl");
			
var inputMem = [];
var outputMem = [];

var input = [];
var output = [];
input = parallel.randomFill(input, 10);
output = parallel.zeroFill(output, 10);

inputMem = parallel.copy(input);
outputMem = parallel.copy(output);

var kern = parallel.buildProgram(source,'MedianFilter');
parallel.parameter(kern, 0, inputMem);
parallel.parameter(kern, 1, outputMem);

var cq = parallel.run(kern);
output = parallel.read(kern,cq,output, outputMem);
console.log(output);

