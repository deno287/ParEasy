
var parallel = require('../../../parallel.js');
var fs = require('fs');
var source = parallel.readCore(__dirname + "/core.cl");
var kern = parallel.buildProgram(source, "core");
			
			var inputsMem = [];
var outputsMem = [];		

var inputs = [];
var outputs = [];
inputs = parallel.randomFill(10);
outputs = parallel.zeroFill(10);

inputsMem = parallel.copy(inputs);
outputsMem = parallel.copy(outputs);
parallel.parameter(kern, 0, inputsMem);
parallel.parameter(kern, 1, outputsMem);

var cq = parallel.run(kern, 1, 10);
parallel.read(kern,cq,outputsMem, outputs);


