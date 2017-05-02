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
