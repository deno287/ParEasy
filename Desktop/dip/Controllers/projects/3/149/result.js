
var parallel = require('../../../denis.js');
var fs = require('fs');
var source = parallel.readCore(__dirname + "/core.cl");
			
			var in_buf=[];
var out_buf=[];

var in_obj = [];
var out_obj = [];

in_obj = parallel.createMatrix(in_obj, 10, 10, 1);
out_obj = parallel.createMatrix(out_obj, 10, 10);

in_buf = parallel.copy(in_obj);
out_buf = parallel.copy(out_obj);var kern = parallel.buildProgram(source,"copy");		
parallel.parameter(kern, 0, in_buf);
parallel.parameter(kern, 1, out_buf);

var cq = parallel.run(kern, 1, 100);
out_obj = parallel.read(kern,cq,out_obj,out_buf);
parallel.result(out_obj);			


