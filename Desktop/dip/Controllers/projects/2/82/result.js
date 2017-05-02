
var parallel = require('../../../parallel.js');
var fs = require('fs');
var source = parallel.readCore(__dirname + "/core.cl");
var kern = parallel.buildProgram(source, "core");
			
var input_buf = [];
var len_buf = [];
var output_buf = [];		

var input = [];
var output = [];
var len = [];
len = parallel.zeroFill(1);
input = parallel.randomFill(10);
output = parallel.zeroFill(10);
len[0] = 10;

input_buf = parallel.copy(input);
len_buf = parallel.copy(len);
output_buf = parallel.copy(output);


parallel.parameter(kern, 0, input_buf);
parallel.parameter(kern, 1, output_buf);
parallel.parameter(kern, 2, len_buf);

var cq = parallel.run(kern, 1, 10);
parallel.read(kern,cq,output_buf, output);
console.log(output);


