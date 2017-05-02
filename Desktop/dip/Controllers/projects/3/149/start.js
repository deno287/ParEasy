var kern = parallel.buildProgram("copy");		
parallel.parameter(kern, 0, in_buf);
parallel.parameter(kern, 1, out_buf);

parallel.run(kern, 1, 100);
parallel.result(out_obj);			

