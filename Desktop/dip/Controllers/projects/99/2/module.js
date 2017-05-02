module.exports = 
 { 
 start: function(){ 

var parallel = require('../../../denis.js');
var fs = require('fs');
var source = parallel.readCore(__dirname + "/core.cl");
var kern = parallel.buildProgram(source, "core");
			
var inB=[];
var outB=[];
var count_B = [];
var allB = [];


var in_matrix = [];
var out_matrix = [];
var all = [];

in_matrix = parallel.randomBinFill(100);
out_matrix = parallel.zeroFill(100);
all = parallel.zeroFill(1000);
var count = [];
count = parallel.zeroFill(1);
count[0] = 0;

inB = parallel.copy(in_matrix);
outB = parallel.copy(out_matrix);
allB = parallel.copy(all);
count_B = parallel.copy(count);



for (var cycle = 0; cycle < 10; cycle++){
	count[0] = cycle;
	inB = parallel.copy(in_matrix);
	outB = parallel.copy(out_matrix);
	count_B = parallel.copy(count);
	allB = parallel.copy(all);

	parallel.parameter(kern, 0, inB);
	parallel.parameter(kern, 1, outB);
	parallel.parameter(kern, 2, count_B);
	parallel.parameter(kern, 3, allB);

	var cq = parallel.run(kern, 1, 100);
	parallel.read(kern,cq,outB, out_matrix);
	parallel.read(kern,cq,allB, all);
	in_matrix = out_matrix;
}
console.log(all);
return all;



} 
 }