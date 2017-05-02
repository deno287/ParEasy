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
