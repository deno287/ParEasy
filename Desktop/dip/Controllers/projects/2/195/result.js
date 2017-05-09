
var parallel = require('../../../denis.js');
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

bufferA = parallel.copy(A);
bufferB = parallel.copy(B);
parallel.parameter(kern, 0, matrixA);
parallel.parameter(kern, 1, matrixB);

var cq = parallel.run(kern, 1, 1);			

