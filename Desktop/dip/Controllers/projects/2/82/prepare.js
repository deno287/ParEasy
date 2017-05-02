var inputs = [];
var outputs = [];
var len = [];
len = parallel.zeroFill(1);
inputs = parallel.randomFill(100);
outputs = parallel.zeroFill(100);
len[0] = 100;

input_buf = parallel.createBuffer(input);
len_buf = parallel.createBuffer(len);
output_buf = parallel.createBuffer(output);


