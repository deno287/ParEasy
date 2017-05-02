
var $ = require('../../../parallel.js');
var fs = require('fs');
process.on('message', (m) => {	
    var mess = start();
});
var mess = start();
process.send({ foo: mess });
			
			var width = 2187;
var height = 2187;


		
var ctx = $.createContext();

//var input = $.createImage(ctx, "read");
//var input = (__dirname + '/images/image.gif');

var inputMem = $.createBuffer(ctx, input, ["read","alloc"]);
var outputMem = $.createBuffer(ctx, output, ["write","alloc"]);

var source =  $.readCore(__dirname + '/core.cl');
var kern = $.buildProgram(ctx, source, "sobel");
$.param(kern, 0, "uint*", inputMem);
$.param(kern, 1, "uint*", outputMem);

var result = $.getResult(ctx, kern, output, outputMem);

return result;

			