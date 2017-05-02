var A = [];
var B = [];
var C = [];
A = parallel.randomFill(100);
B = parallel.randomFill(100);
C = parallel.zeroFill(100);

aBuffer = parallel.copy(A);
bBuffer = parallel.copy(B);
cBuffer = parallel.copy(C);