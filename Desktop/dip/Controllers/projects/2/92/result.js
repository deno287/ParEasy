
var parallel = require('../../../parallel.js');
var fs = require('fs');
var source = parallel.readCore(__dirname + "/core.cl");
var kern = parallel.buildProgram(source, "core");
			
			var aBuffer = [];
var bBuffer = [];
var cBuffer = [];


var A = [];
var B = [];
var C = [];
A = parallel.randomFill(100);
B = parallel.randomFill(100);
C = parallel.zeroFill(100);

aBuffer = parallel.copy(A);
bBuffer = parallel.copy(B);
cBuffer = parallel.copy(C);parallel.parameter(kern, 0, aBuffer);
parallel.parameter(kern, 1, bBuffer);
parallel.parameter(kern, 2, cBuffer);

var cq = parallel.run(kern, 1, 100);
parallel.read(kern,cq,cBuffer, C);
