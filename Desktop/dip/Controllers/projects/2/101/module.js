module.exports = 
 { 
 start: function(){ 

var parallel = require('../../../denis.js');
var fs = require('fs');
var source = parallel.readCore(__dirname + "/core.cl");
var kern = parallel.buildProgram(source, "core");
			
			var in_buf=[];
var out_buf=[];

var in_obj = [];
var out_obj = [];

in_obj = parallel.createRandomMatrix(10, 10);
out_obj = parallel.createZeroMatrix(10, 10);

in_buf = parallel.copy(in_obj);
out_buf = parallel.copy(out_obj);parallel.parameter(kern, 0, in_buf);
parallel.parameter(kern, 1, out_buf);

var cq = parallel.run(kern, 1, 100);
parallel.read(kern,cq,out_buf, out_obj);



return out_obj;} 
 }