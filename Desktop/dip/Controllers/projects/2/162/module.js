module.exports = 
 { 
 start: function(){ 

var parallel = require('../../../denis.js');
var fs = require('fs');
var source = parallel.readCore(__dirname + "/core.cl");
var kern = parallel.buildProgram(source, "core");
			
			var buffer_M = [];
var buffer_R = [];
var buffer_nodes = [];

var matrix_M = [];
var matrix_R = [];

var rows = 10;
var cols = 10;

matrix_M = parallel.createRandomGraph(10, 5);
matrix_R = parallel.createZeroGraph(10);
var nodes = parallel.zeroFill(1);
nodes[0] = 10;

console.log(matrix_M);

buffer_M = parallel.copy(matrix_M);
buffer_R = parallel.copy(matrix_R);
buffer_nodes = parallel.copy(nodes);parallel.parameter(kern, 0, buffer_M);
parallel.parameter(kern, 1, buffer_R);
parallel.parameter(kern, 2, buffer_nodes);

var cq = parallel.run(kern, 2, 10);
parallel.read(kern,cq,buffer_M, matrix_M);
parallel.read(kern,cq,buffer_R, matrix_R);

return [matrix_M,matrix_R]} 
 }