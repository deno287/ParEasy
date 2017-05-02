
var parallel = require('../../../parallel.js');
var fs = require('fs');
var source = parallel.readCore(__dirname + "/core.cl");
var kern = parallel.buildProgram(source, "core");
			
			var inB=[];
var outB=[];

var in_matrix = [];
var out_matrix = [];

var numrows = 4, numcols = 4;
in_matrix = parallel.createRandomGraph(4, 4);
//in_matrix = parallel.createZeroMatrix(numrows, numcols);
out_matrix = parallel.createZeroMatrix(numrows, numcols);

//in_matrix[0+2*numcols]=9;
//in_matrix[0+3*numcols]=2;
//in_matrix[1+2*numcols]=1;
//in_matrix[1+3*numcols]=7;
//in_matrix[2+0*numcols]=9;
//in_matrix[2+1*numcols]=1;
//in_matrix[3+0*numcols]=2;
//in_matrix[3+1*numcols]=7;



outB = parallel.copy(out_matrix);
inB = parallel.copy(in_matrix);parallel.parameter(kern, 0, inB);
parallel.parameter(kern, 1, outB);

var cq = parallel.run(kern, 1, 16);
parallel.read(kern,cq,outB, out_matrix);

