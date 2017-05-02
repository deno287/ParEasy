var kern = parallel.buildProgram("sort_sel");
parallel.parameter(kern, 0, inputsMem);
parallel.parameter(kern, 1, outputsMem);

var result = parallel.getResult(kern, outputs, outputsMem);
console.log(result);