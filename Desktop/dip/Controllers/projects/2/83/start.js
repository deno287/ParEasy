var kern = parallel.buildProgram('MedianFilter');
parallel.parameter(kern, 0, inputMem);
parallel.parameter(kern, 1, outputMem);

parallel.run(kern);
console.log(output);
