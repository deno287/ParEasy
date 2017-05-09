var cl = require("node-opencl");
var fs = require("fs");

function createContext(){
	return cl.createContextFromType(
		[cl.CONTEXT_PLATFORM, cl.getPlatformIDs()[0]], cl.DEVICE_TYPE_GPU, null, null
	);
};

var ctx = createContext();

module.exports = {
	
	randomFill: function (range){
		var item = new Uint32Array(range);

		for (var i = 0; i < range; i++){
			var randomnumber=Math.ceil(Math.random()*99)
			item[i] = randomnumber;
		}
		//var length = Uint32Array.BYTES_PER_ELEMENT * item.length;
		//var lengt = this.sizeOfObject(item);
		//console.log(length, lengt);	
		//console.log(item);
		return item;
	},
	
	randomFill2D: function (item, range1, range2){
		//console.log('tu');
		if(item.constructor == Array){
			for (var i = 0; i < range1; i++){
				item.push([]);
				item[i] = new Uint32Array(range2);
				for (var j = 0; j < range2; j++){
					var randomnumber=Math.ceil(Math.random()*99)
					item[i][j] = randomnumber;
				}
			}
		}		
		return item;
	},
	
	zeroFill: function(range){
		var item = new Uint32Array(range);
		for (var i = 0; i < range; i++){
			item[i] = 0;
		}
		return item;
	},
	
	randomBinFill: function(range){
		var item = new Uint32Array(range);
		for (var i = 0; i < range; i++){
			var randomnumber=(Math.floor(Math.random() * 9) % 2);
			item[i] = randomnumber;
		}
		return item;
	},
	
	len: function(item){
		return item.length;
	},
	
	createRandomMatrix: function(row, col){
		var item = new Uint32Array(row*col).fill(0);
		for (var i = 0; i < col; i++){
			for (var j = 0; j < row; j++){
				var randomnumber=Math.ceil(Math.random()*99);
				item[i+j*col] = randomnumber;
			}
		}
		return item;
	},

	createZeroMatrix: function(row, col){
		var item = new Uint32Array(row*col).fill(0);
		return item;
	},
	
	createZeroGraph: function(nodes){
		var item = new Uint32Array(nodes*nodes).fill(0);
		return item;
	},
	
	createRandomGraph: function(nodes, edges){
		var item = new Uint32Array(nodes*nodes).fill(0);
		var num_edge = 0;
		for (var i=0; i<edges; i++){
			while (num_edge != edges){
				var randomEdge=Math.ceil(Math.random()*10);
				var row = (Math.ceil(Math.random()*nodes))-1;
				var col = (Math.ceil(Math.random()*nodes))-1;
				if (row != col){
					var item_x = (row+col*nodes);
					var item_y = (col+row*nodes);
					if (item[item_x] == 0){
						item[item_x] = randomEdge;
						item[item_y] = randomEdge;
						num_edge += 1;
					}
				}
			}
		}
		var infinity = 10*nodes;
		for (var i=0; i<nodes; i++){
			for (var j=0; j<nodes; j++){
				console.log(item[i+j*nodes], infinity);
				if ((item[i+j*nodes] == 0) && (i != j)){
					item[i+j*nodes] = infinity;
					item[j+i*nodes] = infinity;
				}
			}
		}
		return item;
	},
	
	/*
	createImage: function(ctx, options){
		if (options == "read"){
			var opt = cl.MEM_READ_ONLY;
		}
		else if (options == "write"){
			var opt = cl.MEM_WRITE_ONLY;
		}
		
		var ImageFormat = host.conel.types.ImageFormat;
		var format = new ImageFormat({
			imageChannelOrder: host.cl.defs.CL_RGBA,
			imageChannelDataType: host.cl.defs.CL_UNSIGNED_INT8
		});
		var src = CLImage2D.wrapReadOnly(ctx, format, 100, 100, 0, NULL);
	}
	*/
	createImage: function(options){
		if (options == "read"){
			var opt = cl.MEM_READ_ONLY;
		}
		else if (options == "write"){
			var opt = cl.MEM_WRITE_ONLY;
		}
		var format = ({
			imageChannelOrder: cl.RGBA,
			imageChannelDataType: cl.UNSIGNED_INT8
		});
		return cl.createImage2D(ctx, opt, format, 100, 300, 0, null);
	},
	
	readCore: function(core){
		var stringCode = fs.readFileSync(core).toString();
		var resultCode = "";
		var firstLine = stringCode.split(")");
		var firstPart = firstLine.shift();
		var secondPart = firstLine.join(")");
		var items = firstPart.split("(");
		var nameFunction = items[0].replace("void", "__kernel void ");
		resultCode += (nameFunction+"(");
		var items = items[1].split(",");
		for (var i=0; i<items.length; i++){
			var x = items[i].replace(items[i], "__global "+items[i]);
			resultCode += (x);
			if (i != (items.length-1)){
				resultCode += (",");
			}
		}
		resultCode += ")";
		stringCode = secondPart.split("\n");
		for (line of stringCode){
			if (line.includes("getWorkerNumber(")){
				line = line.replace("getWorkerNumber(", "get_global_id(");
			}
			else if (line.includes("getWorkersCount(")){
				line = line.replace("getWorkersCount(", "get_global_size(");
			}
			else if (line.includes("barrier()")){
				line = line.replace("barrier()", "barrier(CLK_LOCAL_MEM_FENCE)");
			}
			else if (line.includes("int *")){
				var new_line = "";
				line = line.split("(");
				new_line += (line[0] + "(");
				console.log(line[0])
				line = line[1].split(")");
				line = line[0].split(",");
				for (var item = 0; item < line.length; item++){
					var part = "";
					if (line[item].includes("*")){
						part = "__global " + line[item];
						new_line += part;
					}
					else{
						new_line += (line[item]);
					}
					if (item != (line.length-1)){
						new_line += ", ";
					}
				}
				new_line += "){";
				line = new_line;
			}
			resultCode += (line + ("\n"));
		}
		//console.log(resultCode);	
		return resultCode;		
	},
	
	buildProgram: function(source, nameFunction){
		var prog = cl.createProgramWithSource(ctx, source);
		cl.buildProgram(prog);
		return cl.createKernel(prog, nameFunction);
	},
	
	createBuffer: function(object){
		var con = object.constructor;
		if (con == Uint32Array){ var type = "uint*"};
		//var first_option;
		//var second_option;
		//var length = Uint32Array.BYTES_PER_ELEMENT * object.length;
		var length = con.BYTES_PER_ELEMENT * object.length;
		/*
		if(options.length == 1){
			if (options[0] == "read"){
				first_option = cl.MEM_READ_ONLY;
			}
			else if(options[0] == "write"){
				first_option = cl.MEM_WRITE_ONLY;
			}
			else if(options[0] == "read-write"){
				first_option = cl.MEM_READ_WRITE;
			}
			return [cl.createBuffer(ctx, first_option, length, object), type];
		}
		if(options.length > 1){
			if (options[0] == "read"){
				first_option = cl.MEM_READ_ONLY;
			}
			else if(options[0] == "write"){
				first_option = cl.MEM_WRITE_ONLY;
			}
			else if(options[0] == "read-write"){
				first_option = cl.MEM_READ_WRITE;
			}
			if (options[1] == "use"){
				second_option = cl.MEM_USE_HOST_PTR;
			}
			else if(options[1] == "alloc"){
				second_option = cl.MEM_ALLOC_HOST_PTR;
			}
			else if(options[1] == "copy"){
				second_option = cl.MEM_COPY_HOST_PTR;
			}
			return [cl.createBuffer(ctx, first_option | second_option, length, object), type];
		}
		*/
		return [cl.createBuffer(ctx, cl.MEM_WRITE_ONLY | cl.MEM_COPY_HOST_PTR, length, object), type];
	},
	
	copy: function(obj){
		return this.createBuffer(obj);
		//cl.enqueueWriteBuffer(queue, bBuffer, true, 0, B.length*Uint32Array.BYTES_PER_ELEMENT, B);
	},
	
	parameter: function(kern, num, object){
		if (object.length != 2){
			var type = "uint";
			var buf = object;
			//console.log("jeden:", type, obj);
		}
		else{
			var type = object[1];
			var buf = object[0];
			//console.log("dvoj:", type, obj);
			cl.setKernelArg(kern, num, type, buf);
		}
	},
	
	run: function(kern, group, size){
		var device = cl.getContextInfo(ctx, cl.CONTEXT_DEVICES)[0];
		if (cl.createCommandQueueWithProperties !== undefined){
			var cq = cl.createCommandQueueWithProperties(ctx, device, []);
		}
		else{
			var cq = cl.createCommandQueue(ctx, device, null);
		}
		if (group == 1){
			size = [size];
		}
		else if (group == 2){
			size = [size, size];
		}
		else if (group == 3){
			size = [size, size, size];
		}
		cl.enqueueNDRangeKernel(cq, kern, group, null, size, null, [], true);
		return cq;
	},
	
	read: function(kern, cq, buffer, output){
		var length = output.length;
		cl.enqueueReadBuffer(cq, buffer[0], true, 0, length*(output.constructor).BYTES_PER_ELEMENT, output);
		cl.finish(cq);
		
		//return output;
	},
	
	printResult: function(item){
		//console.log("result&%&", item[1]);
		console.log(item);
		return item;
	},
	
	draw: function(item, type){
		if (type == "1D"){
			console.log("draw1D&%&", item);
		}
		if (type == "2D"){
			console.log("draw2D&%&", item);
		}
		if (type == "matrix"){
			console.log("drawMatrix&%&", item);
		}
		if (type == "graph"){
			console.log("drawGraph&%&", item);
		}
	},
	
	sizeOfObject: function( object ) {

		var objectList = [];
		var stack = [ object ];
		var bytes = 0;

		while ( stack.length ) {
			var value = stack.pop();

			if ( typeof value === 'boolean' ) {
				bytes += 4;
			}
			else if ( typeof value === 'string' ) {
				bytes += value.length * 2;
			}
			else if ( typeof value === 'number' ) {
				bytes += 8;
			}
			else if
			(
				typeof value === 'object'
				&& objectList.indexOf( value ) === -1
			)
			{
				objectList.push( value );

				for( var i in value ) {
					stack.push( value[ i ] );
				}
			}
		}
		return bytes;
	}
};
