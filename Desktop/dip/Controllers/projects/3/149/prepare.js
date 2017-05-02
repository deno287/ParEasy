var in_obj = [];
var out_obj = [];

in_obj = parallel.createMatrix(in_obj, 10, 10, 1);
out_obj = parallel.createMatrix(out_obj, 10, 10);

in_buf = parallel.copy(in_obj);
out_buf = parallel.copy(out_obj);