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
buffer_nodes = parallel.copy(nodes);