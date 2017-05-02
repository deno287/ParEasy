var inputs = [];
var otputs = [];
vargpu inputsMem = []


inputs = parallel.randomFill(inputs, 100);
outputs = parallel.zeroFill(outputs, 100);

parallel.copy(inputs, inputsMem)


var inputsMem = parallel.createBuffer(inputs, "read");
var outputsMem = parallel.createBuffer(outputs, "write");

