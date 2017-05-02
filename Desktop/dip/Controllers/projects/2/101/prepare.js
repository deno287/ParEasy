var in_obj = [];
var out_obj = [];

in_obj = parallel.createRandomMatrix(10, 10);
out_obj = parallel.createZeroMatrix(10, 10);

in_buf = parallel.copy(in_obj);
out_buf = parallel.copy(out_obj);