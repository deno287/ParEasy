
var parallel = require('../../../denis.js');
var fs = require('fs');
var source = parallel.readCore(__dirname + "/core.cl");
var kern = parallel.buildProgram(source, "core");
			
			var bufSused = [];var bufNavrh = [];
var maticaSused = [];var maticaNavrh = [];var rows = ;var cols = ;maticaSused = parallel.createRandomGraph(20, 15);var pocet = parallel.zeroFill(1);bufSused = parallel.copy();bufNavrh = parallel.copy();bufPocet = parallel.copy();
