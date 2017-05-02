
var parallel = require('../../../parallel.js');
var fs = require('fs');
var source = parallel.readCore(__dirname + "/core.cl");
process.on('message', (m) => {	
    var mess = start();
});
var mess = start();
process.send({ foo: mess });
			
			var inputs = [];
var otputs = [];
vargpu inputsMem = []


inputs = parallel.randomFill(inputs, 100);
outputs = parallel.zeroFill(outputs, 100);

parallel.copy(inputs, inputsMem)


var inputsMem = parallel.createBuffer(inputs, "read");
var outputsMem = parallel.createBuffer(outputs, "write");


var kern = parallel.buildProgram(source,"sort_sel");
parallel.parameter(kern, 0, inputsMem);
parallel.parameter(kern, 1, outputsMem);

var result = parallel.getResult(kern, outputs, outputsMem);
console.log(result);
			