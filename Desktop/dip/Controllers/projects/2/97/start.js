for (var cycle = 0; cycle < 5; cycle++){
    var kern = parallel.buildProgram("life");

   	parallel.parameter(kern, 0, inB);
    parallel.parameter(kern, 1, outB);

	var cq = parallel.run(kern, 1, 10);
	out_matrix = parallel.read(kern, cq, out_matrix, outB);
	//console.log("Vysledok po ", cycle+1, ".cykle: ", out_matrix);
	parallel.draw(out_matrix, "matrix");
    in_matrix = out_matrix;
}

