
var parallel = require('../../../parallel.js');
var fs = require('fs');
var source = parallel.readCore(__dirname + "/core.cl");
var kern = parallel.buildProgram(source, "core");
			
			var buffer_A=[];
var buffer_B=[];
var buffer_C=[];


var matrixA = [];
var matrixB = [];
var matrixC = [];

var rows = 10;
var cols = 10;
matrixA = parallel.createRandomMatrix(rows, cols);
matrixB = parallel.createRandomMatrix(rows, cols);
matrixC = parallel.createZeroMatrix(rows, cols);

buffer_A = parallel.copy(matrixA);
buffer_B = parallel.copy(matrixB);
buffer_C = parallel.copy(matrixC);
parallel.parameter(kern, 0, buffer_A);
parallel.parameter(kern, 1, buffer_B);
parallel.parameter(kern, 2, buffer_C);

var cq = parallel.run(kern, 1, 100);
parallel.read(kern,cq,buffer_C, matrixC);


