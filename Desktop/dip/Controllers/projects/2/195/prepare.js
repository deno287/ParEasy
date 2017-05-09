var A = [];
var B = [];
var C = [];
A = parallel.randomFill(100);
B = parallel.randomFill(100);
C = parallel.zeroFill(100);

bufferA = parallel.copy(A);
bufferB = parallel.copy(B);
