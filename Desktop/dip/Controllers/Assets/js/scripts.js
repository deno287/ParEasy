		/*
		var CPU_list = [];
		var GPU_list = [];
		
		$(function(){
			$('.draggable').draggable({
				helper:"clone"
			});
		});
		
		$(function(){
			$('.droppable').droppable({
				drop: function (e, ui) {
					$(ui.draggable).clone().appendTo($(this));
					var id = "#" + ui.draggable[0].id;
					if ($(this).attr('id') == 'CPU_panel'){
						CPU_list.push(ui.draggable[0].id);
					}
					else if ($(this).attr('id') == 'GPU_panel'){
						GPU_list.push(ui.draggable[0].id);
					}
				}
			})
		});
		
		function SendData(){
			var s = io.connect();
			//var destination = '/exercise_create.html'
			s.on('redirect', function(destination) {
				window.location.href = '/exercise_create.html'+"?CPU="+ CPU_list + "&GPU=" + GPU_list;
			});
			//window.location.href = "exercise_create.html?CPU=" + CPU_list + "&GPU=" + GPU_list;
		}
		*/
		
var array1D = [];
var array1D_2 = [];
var array1D_3 = [];
var array2 = [[]];
var array2_2 = [[]];
var array2_3 = [[]];

function readFile(){
    var x = document.getElementById('myFile');
    var txt = "";
    if ('files' in x) {
        if (x.files.length == 0) {
            txt = "Select one or more files.";
        } else {
            for (var i = 0; i < x.files.length; i++) {
                txt += "<br><strong>" + (i+1) + ". file</strong><br>";
                var file = x.files[i];
                if ('name' in file) {
                    txt += "name: " + file.name + "<br>";
                }
                if ('size' in file) {
                    txt += "size: " + file.size + " bytes <br>";
                }
            }
        }
    }
    else {
        if (x.value == "") {
            txt += "Select one or more files.";
        } else {
            txt += "The files property is not supported by your browser!";
            txt  += "<br>The path of the selected file: " + x.value;
        }
    }
    document.getElementById("demo").innerHTML = txt;
	var reader = new FileReader();
    var textFile = file;
    reader.readAsText(textFile);
    $(reader).on('load', processFile);
}

function processFile(e) {
	var pom_arr = [];
    var file = e.target.result,
        results;
    if (file && file.length) {
        results = file.split(" ");
		//console.log(results);
    }
	if (results.length < 11){
		for ($i=0; $i<results.length; $i++){
			pom_arr.push(results[$i]);
			$('#show1DArray').append("<div class='box'>"+results[$i]+"</div>");
		}
	}
	else {
		for ($i=0; $i<results.length; $i++){
			pom_arr.push(results[$i]);
			if ($i<6){
				$('#show1DArray').append("<div class='box'>"+results[$i]+"</div>");
			}
			else if ($i==results.length-1){
				$('#show1DArray').append("<div class='box'> . . . </div>");
				$('#show1DArray').append("<div class='box'>"+results[$i]+"</div>");
			}
		}
	}
	if (array1D != []){
		if (array1D_2 != []){
			array1D_3 = pom_arr;
		}
		else{
			array1D_2 = pom_arr;
		}
	}
	else{
		array1D = pom_arr;
	}
}

function readFile2(){
    var x = document.getElementById("myFile2");
    var txt = "";
    if ('files' in x) {
        if (x.files.length == 0) {
            txt = "Select one or more files.";
        } else {
            for (var i = 0; i < x.files.length; i++) {
                txt += "<br><strong>" + (i+1) + ". file</strong><br>";
                var file = x.files[i];
                if ('name' in file) {
                    txt += "name: " + file.name + "<br>";
                }
                if ('size' in file) {
                    txt += "size: " + file.size + " bytes <br>";
                }
            }
        }
    }
    else {
        if (x.value == "") {
            txt += "Select one or more files.";
        } else {
            txt += "The files property is not supported by your browser!";
            txt  += "<br>The path of the selected file: " + x.value;
        }
    }
    document.getElementById("demo2").innerHTML = txt;
	var reader = new FileReader();
    var textFile = file;
    reader.readAsText(textFile);
    $(reader).on('load', processFile2);
}

function processFile2(e) {
	var pom_arr = [[]];
    var file = e.target.result,
        results;
    if (file && file.length) {
        results = file.split("\n");
		results_i = results[0].split(" ");
    }
	if (results.length < 6){
			if (results_i < 11){
				for ($i=0; $i<results.length; $i++){
					results_bar = results[$i].split(" ");
					for ($j=0; $j<results_bar.length; $j++){
						pom_arr[$i].push(results_bar[$j]);
						$('#show2DArray').append("<div class='box'>"+results_bar[$j]+"</div>");
					}
					$('#show2DArray').append("<br />");
					pom_arr.push([]);
				}
			}
			else {
				for ($i=0; $i<results.length; $i++){
					results_bar = results[$i].split(" ");
					for ($j=0; $j<results_bar.length; $j++){
						pom_arr[$i].push(results_bar[$j]);
						if ($j<6){
							$('#show2DArray').append("<div class='box'>"+results_bar[$j]+"</div>");
						}
						else if ($j==results_bar.length-1){
							$('#show2DArray').append("<div class='box'> . . . </div>");
							$('#show2DArray').append("<div class='box'>"+results_bar[$j]+"</div>");
						}
					}
					$('#show2DArray').append("<br />");
					pom_arr.push([]);
				}
			}
		}
		else {
			if (results_i < 11){
				for ($i=0; $i<results.length; $i++){
					results_bar = results[$i].split(" ");
					for ($j=0; $j<results_bar.length; $j++){
						pom_arr[$i].push(results_bar[$j]);
						if ($i < 3) {
							$('#show2DArray').append("<div class='box'>"+results_bar[$j]+"</div>");
						}
						else if ($i == results.length-1) {
							$('#show2DArray').append("<div class='box'>"+results_bar[$j]+"</div>");
						}
					}
					if ($i < 3) {
						$('#show2DArray').append("<br />");
					}
					else if ($i == results.length-2){
						$('#show2DArray').append("<div class='box'> . . . </div><br />");
						$('#show2DArray').append("<div class='box'> . . . </div><br />");
						$('#show2DArray').append("<div class='box'> . . . </div><br />");
					}
					pom_arr.push([]);
				}
			}
			else {
				for ($i=0; $i<results.length; $i++){
					results_bar = results[$i].split(" ");
					for ($j=0; $j<results_bar.length; $j++){
						pom_arr[$i].push(results_bar[$j]);
						if ($i < 3){
							if ($j<6){
								$('#show2DArray').append("<div class='box'>"+results_bar[$j]+"</div>");
							}
							else if ($j==results_bar.length-1){
								$('#show2DArray').append("<div class='box'> . . . </div>");
								$('#show2DArray').append("<div class='box'>"+results_bar[$j]+"</div>");
							}
						}
						else if ($i == results.length-1){
							if ($j<6){
								$('#show2DArray').append("<div class='box'>"+results_bar[$j]+"</div>");
							}
							else if ($j==results_bar.length-1){
								$('#show2DArray').append("<div class='box'> . . . </div>");
								$('#show2DArray').append("<div class='box'>"+results_bar[$j]+"</div>");
							}
						}
					}
					if ($i < 3) {
						$('#show2DArray').append("<br />");
					}
					else if ($i == results.length-2){
						$('#show2DArray').append("<div class='box'> . . . </div><br />");
						$('#show2DArray').append("<div class='box'> . . . </div><br />");
						$('#show2DArray').append("<div class='box'> . . . </div><br />");
					}
					pom_arr.push([]);
				}
			}
		}
		
	if (array2 != []){
		if (array2_2 != []){
			array2_3 = pom_arr;
		}
		else{
			array2_2 = pom_arr;
		}
	}
	else{
		array2 = pom_arr;
	}
}

function readFile3(){
    var x = document.getElementById("myFile3");
    var txt = "";
    if ('files' in x) {
        if (x.files.length == 0) {
            txt = "Select one or more files.";
        } else {
            for (var i = 0; i < x.files.length; i++) {
                txt += "<br><strong>" + (i+1) + ". file</strong><br>";
                var file = x.files[i];
                if ('name' in file) {
                    txt += "name: " + file.name + "<br>";
                }
                if ('size' in file) {
                    txt += "size: " + file.size + " bytes <br>";
                }
            }
        }
    }
    else {
        if (x.value == "") {
            txt += "Select one or more files.";
        } else {
            txt += "The files property is not supported by your browser!";
            txt  += "<br>The path of the selected file: " + x.value;
        }
    }
    document.getElementById("demo3").innerHTML = txt;
	var reader = new FileReader();
    var textFile = file;
    reader.readAsText(textFile);
    $(reader).on('load', processFile3);
}

var graph = [];
var graph2 = [];
var graph3 = [];

function processFile3(e) {
	var pom_graph = [];
    var file = e.target.result,
        results;
    if (file && file.length) {
        results = file.split(" ");
		//console.log(results);
    }
	if (results.length < 11){
		for ($i=0; $i<results.length; $i++){
			pom_graph.push(results[$i]);
			$('#showGraph').append("<div class='box'>"+results[$i]+"</div>");
		}
	}
	else {
		for ($i=0; $i<results.length; $i++){
			pom_graph.push(results[$i]);
			if ($i<6){
				$('#showGraph').append("<div class='box'>"+results[$i]+"</div>");
			}
			else if ($i==results.length-1){
				$('#showGraph').append("<div class='box'> . . . </div>");
				$('#showGraph').append("<div class='box'>"+results[$i]+"</div>");
			}
		}
	}
	if (graph != []){
		if (graph2 != []){
			graph3 = pom_graph;
		}
		else{
			graph2 = pom_graph;
		}
	}
	else{
		graph = pom_graph;
	}
}

function readFile4(){
    var x = document.getElementById("myFile4");
    var txt = "";
    if ('files' in x) {
        if (x.files.length == 0) {
            txt = "Select one or more files.";
        } else {
            for (var i = 0; i < x.files.length; i++) {
                txt += "<br><strong>" + (i+1) + ". file</strong><br>";
                var file = x.files[i];
                if ('name' in file) {
                    txt += "name: " + file.name + "<br>";
                }
                if ('size' in file) {
                    txt += "size: " + file.size + " bytes <br>";
                }
            }
        }
    }
    else {
        if (x.value == "") {
            txt += "Select one or more files.";
        } else {
            txt += "The files property is not supported by your browser!";
            txt  += "<br>The path of the selected file: " + x.value;
        }
    }
    document.getElementById("demo4").innerHTML = txt;
	var reader = new FileReader();
    var textFile = file;
    reader.readAsText(textFile);
    $(reader).on('load', processFile4);
}

var list = [];
var list2 = [];
var list3 = [];

function processFile4(e) {
	var pom_list = [];
    var file = e.target.result,
        results;
    if (file && file.length) {
        results = file.split(" ");
		//console.log(results);
    }
	if (results.length < 11){
		for ($i=0; $i<results.length; $i++){
			pom_list.push(results[$i]);
			$('#showList').append("<div class='box'>"+results[$i]+"</div>");
		}
	}
	else {
		for ($i=0; $i<results.length; $i++){
			pom_list.push(results[$i]);
			if ($i<6){
				$('#showList').append("<div class='box'>"+results[$i]+"</div>");
			}
			else if ($i==results.length-1){
				$('#showList').append("<div class='box'> . . . </div>");
				$('#showList').append("<div class='box'>"+results[$i]+"</div>");
			}
		}
	}
	if (list != []){
		if (list2 != []){
			list3 = pom_list;
		}
		else{
			list2 = pom_list;
		}
	}
	else{
		list = pom_list;
	}
}

function readFile5(){
    var x = document.getElementById("myFile5");
    var txt = "";
    if ('files' in x) {
        if (x.files.length == 0) {
            txt = "Select one or more files.";
        } else {
            for (var i = 0; i < x.files.length; i++) {
                txt += "<br><strong>" + (i+1) + ". file</strong><br>";
                var file = x.files[i];
                if ('name' in file) {
                    txt += "name: " + file.name + "<br>";
                }
                if ('size' in file) {
                    txt += "size: " + file.size + " bytes <br>";
                }
            }
        }
    }
    else {
        if (x.value == "") {
            txt += "Select one or more files.";
        } else {
            txt += "The files property is not supported by your browser!";
            txt  += "<br>The path of the selected file: " + x.value;
        }
    }
    document.getElementById("demo5").innerHTML = txt;
	var reader = new FileReader();
    var textFile = file;
    reader.readAsText(textFile);
    $(reader).on('load', processFile5);
}

var set = [];
var set2 = [];
var set3 = [];


function processFile5(e) {
	var pom_set = [];
    var file = e.target.result,
        results;
    if (file && file.length) {
        results = file.split(" ");
		//console.log(results);
    }
	if (results.length < 11){
		for ($i=0; $i<results.length; $i++){
			pom_set.push(results[$i]);
			$('#showSet').append("<div class='box'>"+results[$i]+"</div>");
		}
	}
	else {
		for ($i=0; $i<results.length; $i++){
			pom_set.push(results[$i]);
			if ($i<6){
				$('#showSet').append("<div class='box'>"+results[$i]+"</div>");
			}
			else if ($i==results.length-1){
				$('#showSet').append("<div class='box'> . . . </div>");
				$('#showSet').append("<div class='box'>"+results[$i]+"</div>");
			}
		}
	}
	if (set != []){
		if (set2 != []){
			set3 = pom_set;
		}
		else{
			set2 = pom_set;
		}
	}
	else{
		set = pom_set;
	}
}

function previewFile(){
	var preview = document.querySelector('image'); //selects the query named img
	var file    = document.querySelector('input[type=file]').files[0]; //sames as here
	var reader  = new FileReader();

	reader.onloadend = function () {
		preview.src = reader.result;
	}

	if (file) {
		reader.readAsDataURL(file); //reads the data as a URL
	} else {
		preview.src = "";
	}
}
	
	function generate1DArray(){
		var pom_arr = [];
		var x = document.getElementById("form1Darray");
		val1 = x.elements[0].value;
		val2 = x.elements[1].value;
		val3 = x.elements[2].value;
		
		if (val1 < 11){
			for ($i=0; $i<val1; $i++){
				var item = Math.floor((Math.random() * val3) + val2);
				pom_arr.push(item);
				$('#show1DArray').append("<div class='box'>"+item+"</div>");
			}
		}
		else {
			for ($i=0; $i<val1; $i++){
				var item = Math.floor((Math.random() * val3) + val2);
				pom_arr.push(item);
				if ($i<6){
					$('#show1DArray').append("<div class='box'>"+item+"</div>");
				}
				else if ($i==val1-1){
					$('#show1DArray').append("<div class='box'> . . . </div>");
					$('#show1DArray').append("<div class='box'>"+item+"</div>");
				}
			}
		}
		if (array1D != []){
			if (array1D_2 != []){
				array1D_3 = pom_arr;
			}
			else{
				array1D_2 = pom_arr;
			}
		}
		else{
			array1D = pom_arr;
		}
	}
	
	function generate2DArray(){
		var pom_arr = [[]];
		var x = document.getElementById("form2Darray");
		val1 = x.elements[0].value;
		val2 = x.elements[1].value;
		val3 = x.elements[2].value;
		val4 = x.elements[3].value;
		
		if (val1 < 6){
			if (val2 < 11){
				for ($i=0; $i<val1; $i++){
					for ($j=0; $j<val2; $j++){
						var item = Math.floor((Math.random() * val4) + val3);
						pom_arr[$i].push(item);
						$('#show2DArray').append("<div class='box'>"+item+"</div>");
					}
					$('#show2DArray').append("<br />");
					pom_arr.push([]);
				}
			}
			else {
				for ($i=0; $i<val1; $i++){
					for ($j=0; $j<val2; $j++){
						var item = Math.floor((Math.random() * val4) + val3);
						pom_arr[$i].push(item);
						if ($j<6){
							$('#show2DArray').append("<div class='box'>"+item+"</div>");
						}
						else if ($j==val2-1){
							$('#show2DArray').append("<div class='box'> . . . </div>");
							$('#show2DArray').append("<div class='box'>"+item+"</div>");
						}
					}
					$('#show2DArray').append("<br />");
					pom_arr.push([]);
				}
			}
		}
		else {
			if (val2 < 11){
				for ($i=0; $i<val1; $i++){
					for ($j=0; $j<val2; $j++){
						var item = Math.floor((Math.random() * val4) + val3);
						pom_arr[$i].push(item);
						if ($i < 3) {
							$('#show2DArray').append("<div class='box'>"+item+"</div>");
						}
						else if ($i == val1-1) {
							$('#show2DArray').append("<div class='box'>"+item+"</div>");
						}
					}
					if ($i < 3) {
						$('#show2DArray').append("<br />");
					}
					else if ($i == val1-2){
						$('#show2DArray').append("<div class='box'> . . . </div><br />");
						$('#show2DArray').append("<div class='box'> . . . </div><br />");
						$('#show2DArray').append("<div class='box'> . . . </div><br />");
					}
					pom_arr.push([]);
				}
			}
			else {
				for ($i=0; $i<val1; $i++){
					for ($j=0; $j<val2; $j++){
						var item = Math.floor((Math.random() * val4) + val3);
						pom_arr[$i].push(item);
						if ($i < 3){
							if ($j<6){
								$('#show2DArray').append("<div class='box'>"+item+"</div>");
							}
							else if ($j==val2-1){
								$('#show2DArray').append("<div class='box'> . . . </div>");
								$('#show2DArray').append("<div class='box'>"+item+"</div>");
							}
						}
						else if ($i == val1-1){
							if ($j<6){
								$('#show2DArray').append("<div class='box'>"+item+"</div>");
							}
							else if ($j==val2-1){
								$('#show2DArray').append("<div class='box'> . . . </div>");
								$('#show2DArray').append("<div class='box'>"+item+"</div>");
							}
						}
					}
					if ($i < 3) {
						$('#show2DArray').append("<br />");
					}
					else if ($i == val1-2){
						$('#show2DArray').append("<div class='box'> . . . </div><br />");
						$('#show2DArray').append("<div class='box'> . . . </div><br />");
						$('#show2DArray').append("<div class='box'> . . . </div><br />");
					}
					pom_arr.push([]);
				}
			}
		}
		if (array2 != []){
			if (array2_2 != []){
				array2_3 = pom_arr;
			}
			else{
				array2_2 = pom_arr;
			}
		}
		else{
			array2 = pom_arr;
		}
	}
	
	function generateGraph(){		
		var x = document.getElementById("formGraph");
		val1 = x.elements[0].value;		
	}
	
	function generateList(){
		var pom_arr = [];
		var x = document.getElementById("formList");
		val1 = x.elements[0].value;
		val2 = 10;
		val3 = 10;
		
		if (val1 < 11){
			for ($i=0; $i<val1; $i++){
				var item = Math.floor((Math.random() * val3) + val2);
				pom_arr.push(item);
				$('#showList').append("<div class='box'>"+item+"</div>");
			}
		}
		else {
			for ($i=0; $i<val1; $i++){
				var item = Math.floor((Math.random() * val3) + val2);
				pom_arr.push(item);
				if ($i<6){
					$('#showList').append("<div class='box'>"+item+"</div>");
				}
				else if ($i==val1-1){
					$('#showList').append("<div class='box'> . . . </div>");
					$('#showList').append("<div class='box'>"+item+"</div>");
				}
			}
		}
		if (list != []){
			if (list2 != []){
				list3 = pom_arr;
			}
			else{
				list2 = pom_arr;
			}
		}
		else{
			list = pom_arr;
		}
	}
	
	function generateSet(){
		var pom_arr = [];
		var x = document.getElementById("formSet");
		val1 = x.elements[0].value;
		val2 = 10;
		val3 = 10;
		
		if (val1 < 11){
			for ($i=0; $i<val1; $i++){
				var item = Math.floor((Math.random() * val3) + val2);
				pom_arr.push(item);
				$('#showSet').append("<div class='box'>"+item+"</div>");
			}
		}
		else {
			for ($i=0; $i<val1; $i++){
				var item = Math.floor((Math.random() * val3) + val2);
				pom_arr.push(item);
				if ($i<6){
					$('#showSet').append("<div class='box'>"+item+"</div>");
				}
				else if ($i==val1-1){
					$('#showSet').append("<div class='box'> . . . </div>");
					$('#showSet').append("<div class='box'>"+item+"</div>");
				}
			}
		}
		if (set != []){
			if (set2 != []){
				set3 = pom_arr;
			}
			else{
				set = pom_arr;
			}
		}
		else{
			set = pom_arr;
		}
	}
	
	/*   --------------------------------------------------------   GPU part   ----------------------------------------------------------------   */
	
var array1DG = [];
var array1DG_2 = [];
var array1DG_3 = [];
var array2G = [[]];
var array2G_2 = [[]];
var array2G_3 = [[]];

function readFileG(){
    var x = document.getElementById('myFileG');
    var txt = "";
    if ('files' in x) {
        if (x.files.length == 0) {
            txt = "Select one or more files.";
        } else {
            for (var i = 0; i < x.files.length; i++) {
                txt += "<br><strong>" + (i+1) + ". file</strong><br>";
                var file = x.files[i];
                if ('name' in file) {
                    txt += "name: " + file.name + "<br>";
                }
                if ('size' in file) {
                    txt += "size: " + file.size + " bytes <br>";
                }
            }
        }
    }
    else {
        if (x.value == "") {
            txt += "Select one or more files.";
        } else {
            txt += "The files property is not supported by your browser!";
            txt  += "<br>The path of the selected file: " + x.value;
        }
    }
    document.getElementById("demoG").innerHTML = txt;
	var reader = new FileReader();
    var textFile = file;
    reader.readAsText(textFile);
    $(reader).on('load', processFileG);
}

function processFileG(e) {
	var pom_arr = [];
    var file = e.target.result,
        results;
    if (file && file.length) {
        results = file.split(" ");
    }
	if (results.length < 11){
		for ($i=0; $i<results.length; $i++){
			pom_arr.push(results[$i]);
			$('#show1DArrayG').append("<div class='box'>"+results[$i]+"</div>");
		}
	}
	else {
		for ($i=0; $i<results.length; $i++){
			pom_arr.push(results[$i]);
			if ($i<6){
				$('#show1DArrayG').append("<div class='box'>"+results[$i]+"</div>");
			}
			else if ($i==results.length-1){
				$('#show1DArrayG').append("<div class='box'> . . . </div>");
				$('#show1DArrayG').append("<div class='box'>"+results[$i]+"</div>");
			}
		}
	}
	if (array1DG != []){
			if (array1DG_2 != []){
				array1DG_3 = pom_arr;
			}
			else{
				array1DG_2 = pom_arr;
			}
		}
		else{
			array1DG = pom_arr;
		}
}

function readFile2G(){
    var x = document.getElementById("myFile2G");
    var txt = "";
    if ('files' in x) {
        if (x.files.length == 0) {
            txt = "Select one or more files.";
        } else {
            for (var i = 0; i < x.files.length; i++) {
                txt += "<br><strong>" + (i+1) + ". file</strong><br>";
                var file = x.files[i];
                if ('name' in file) {
                    txt += "name: " + file.name + "<br>";
                }
                if ('size' in file) {
                    txt += "size: " + file.size + " bytes <br>";
                }
            }
        }
    }
    else {
        if (x.value == "") {
            txt += "Select one or more files.";
        } else {
            txt += "The files property is not supported by your browser!";
            txt  += "<br>The path of the selected file: " + x.value;
        }
    }
    document.getElementById("demo2G").innerHTML = txt;
	var reader = new FileReader();
    var textFile = file;
    reader.readAsText(textFile);
    $(reader).on('load', processFile2G);
}

function processFile2G(e) {
	var pom_arr = [[]];
    var file = e.target.result,
        results;
    if (file && file.length) {
        results = file.split("\n");
		results_i = results[0].split(" ");
    }
	if (results.length < 6){
			if (results_i < 11){
				for ($i=0; $i<results.length; $i++){
					results_bar = results[$i].split(" ");
					for ($j=0; $j<results_bar.length; $j++){
						pom_arr[$i].push(results_bar[$j]);
						$('#show2DArrayG').append("<div class='box'>"+results_bar[$j]+"</div>");
					}
					$('#show2DArrayG').append("<br />");
					pom_arr.push([]);
				}
			}
			else {
				for ($i=0; $i<results.length; $i++){
					results_bar = results[$i].split(" ");
					for ($j=0; $j<results_bar.length; $j++){
						pom_arr[$i].push(results_bar[$j]);
						if ($j<6){
							$('#show2DArrayG').append("<div class='box'>"+results_bar[$j]+"</div>");
						}
						else if ($j==results_bar.length-1){
							$('#show2DArrayG').append("<div class='box'> . . . </div>");
							$('#show2DArrayG').append("<div class='box'>"+results_bar[$j]+"</div>");
						}
					}
					$('#show2DArrayG').append("<br />");
					pom_arr.push([]);
				}
			}
		}
		else {
			if (results_i < 11){
				for ($i=0; $i<results.length; $i++){
					results_bar = results[$i].split(" ");
					for ($j=0; $j<results_bar.length; $j++){
						pom_arr[$i].push(results_bar[$j]);
						if ($i < 3) {
							$('#show2DArrayG').append("<div class='box'>"+results_bar[$j]+"</div>");
						}
						else if ($i == results.length-1) {
							$('#show2DArrayG').append("<div class='box'>"+results_bar[$j]+"</div>");
						}
					}
					if ($i < 3) {
						$('#show2DArray').append("<br />");
					}
					else if ($i == results.length-2){
						$('#show2DArrayG').append("<div class='box'> . . . </div><br />");
						$('#show2DArrayG').append("<div class='box'> . . . </div><br />");
						$('#show2DArrayG').append("<div class='box'> . . . </div><br />");
					}
					pom_arr.push([]);
				}
			}
			else {
				for ($i=0; $i<results.length; $i++){
					results_bar = results[$i].split(" ");
					for ($j=0; $j<results_bar.length; $j++){
						pom_arr[$i].push(results_bar[$j]);
						if ($i < 3){
							if ($j<6){
								$('#show2DArrayG').append("<div class='box'>"+results_bar[$j]+"</div>");
							}
							else if ($j==results_bar.length-1){
								$('#show2DArrayG').append("<div class='box'> . . . </div>");
								$('#show2DArrayG').append("<div class='box'>"+results_bar[$j]+"</div>");
							}
						}
						else if ($i == results.length-1){
							if ($j<6){
								$('#show2DArrayG').append("<div class='box'>"+results_bar[$j]+"</div>");
							}
							else if ($j==results_bar.length-1){
								$('#show2DArrayG').append("<div class='box'> . . . </div>");
								$('#show2DArrayG').append("<div class='box'>"+results_bar[$j]+"</div>");
							}
						}
					}
					if ($i < 3) {
						$('#show2DArrayG').append("<br />");
					}
					else if ($i == results.length-2){
						$('#show2DArrayG').append("<div class='box'> . . . </div><br />");
						$('#show2DArrayG').append("<div class='box'> . . . </div><br />");
						$('#show2DArrayG').append("<div class='box'> . . . </div><br />");
					}
					pom_arr.push([]);
				}
			}
		}
		if (array2G != []){
			if (array2G_2 != []){
				array2G_3 = pom_arr;
			}
			else{
				array2G_2 = pom_arr;
			}
		}
		else{
			array2G = pom_arr;
		}
}

function readFile3G(){
    var x = document.getElementById("myFile3G");
    var txt = "";
    if ('files' in x) {
        if (x.files.length == 0) {
            txt = "Select one or more files.";
        } else {
            for (var i = 0; i < x.files.length; i++) {
                txt += "<br><strong>" + (i+1) + ". file</strong><br>";
                var file = x.files[i];
                if ('name' in file) {
                    txt += "name: " + file.name + "<br>";
                }
                if ('size' in file) {
                    txt += "size: " + file.size + " bytes <br>";
                }
            }
        }
    }
    else {
        if (x.value == "") {
            txt += "Select one or more files.";
        } else {
            txt += "The files property is not supported by your browser!";
            txt  += "<br>The path of the selected file: " + x.value;
        }
    }
    document.getElementById("demo3G").innerHTML = txt;
	var reader = new FileReader();
    var textFile = file;
    reader.readAsText(textFile);
    $(reader).on('load', processFile3G);
}

var graphG = [];
var graphG2 = [];
var graphG3 = [];

function processFile3G(e) {
	var pom_arr = [];
    var file = e.target.result,
        results;
    if (file && file.length) {
        results = file.split(" ");
		//console.log(results);
    }
	if (results.length < 11){
		for ($i=0; $i<results.length; $i++){
			pom_arr.push(results[$i]);
			$('#showGraphG').append("<div class='box'>"+results[$i]+"</div>");
		}
	}
	else {
		for ($i=0; $i<results.length; $i++){
			pom_arr.push(results[$i]);
			if ($i<6){
				$('#showGraphG').append("<div class='box'>"+results[$i]+"</div>");
			}
			else if ($i==results.length-1){
				$('#showGraphG').append("<div class='box'> . . . </div>");
				$('#showGraphG').append("<div class='box'>"+results[$i]+"</div>");
			}
		}
	}
	if (graphG != []){
			if (graphG2 != []){
				graphG3 = pom_arr;
			}
			else{
				graphG2 = pom_arr;
			}
		}
		else{
			graphG = pom_arr;
		}
}

function readFile4G(){
    var x = document.getElementById("myFile4G");
    var txt = "";
    if ('files' in x) {
        if (x.files.length == 0) {
            txt = "Select one or more files.";
        } else {
            for (var i = 0; i < x.files.length; i++) {
                txt += "<br><strong>" + (i+1) + ". file</strong><br>";
                var file = x.files[i];
                if ('name' in file) {
                    txt += "name: " + file.name + "<br>";
                }
                if ('size' in file) {
                    txt += "size: " + file.size + " bytes <br>";
                }
            }
        }
    }
    else {
        if (x.value == "") {
            txt += "Select one or more files.";
        } else {
            txt += "The files property is not supported by your browser!";
            txt  += "<br>The path of the selected file: " + x.value;
        }
    }
    document.getElementById("demo4G").innerHTML = txt;
	var reader = new FileReader();
    var textFile = file;
    reader.readAsText(textFile);
    $(reader).on('load', processFile4G);
}

var listG = [];
var listG2 = [];
var listG3 = [];

function processFile4G(e) {
	var pom_arr = [];
    var file = e.target.result,
        results;
    if (file && file.length) {
        results = file.split(" ");
    }
	if (results.length < 11){
		for ($i=0; $i<results.length; $i++){
			pom_arr.push(results[$i]);
			$('#showListG').append("<div class='box'>"+results[$i]+"</div>");
		}
	}
	else {
		for ($i=0; $i<results.length; $i++){
			pom_arr.push(results[$i]);
			if ($i<6){
				$('#showListG').append("<div class='box'>"+results[$i]+"</div>");
			}
			else if ($i==results.length-1){
				$('#showListG').append("<div class='box'> . . . </div>");
				$('#showListG').append("<div class='box'>"+results[$i]+"</div>");
			}
		}
	}
	if (listG != []){
			if (listG2 != []){
				listG3 = pom_arr;
			}
			else{
				listG2 = pom_arr;
			}
		}
		else{
			listG = pom_arr;
		}
}

function readFile5G(){
    var x = document.getElementById("myFile5G");
    var txt = "";
    if ('files' in x) {
        if (x.files.length == 0) {
            txt = "Select one or more files.";
        } else {
            for (var i = 0; i < x.files.length; i++) {
                txt += "<br><strong>" + (i+1) + ". file</strong><br>";
                var file = x.files[i];
                if ('name' in file) {
                    txt += "name: " + file.name + "<br>";
                }
                if ('size' in file) {
                    txt += "size: " + file.size + " bytes <br>";
                }
            }
        }
    }
    else {
        if (x.value == "") {
            txt += "Select one or more files.";
        } else {
            txt += "The files property is not supported by your browser!";
            txt  += "<br>The path of the selected file: " + x.value;
        }
    }
    document.getElementById("demo5G").innerHTML = txt;
	var reader = new FileReader();
    var textFile = file;
    reader.readAsText(textFile);
    $(reader).on('load', processFile5G);
}

var setG = [];
var setG2 = [];
var setG3 = [];

function processFile5G(e) {
	var pom_arr = [];
    var file = e.target.result,
        results;
    if (file && file.length) {
        results = file.split(" ");
    }
	if (results.length < 11){
		for ($i=0; $i<results.length; $i++){
			pom_arr.push(results[$i]);
			$('#showSetG').append("<div class='box'>"+results[$i]+"</div>");
		}
	}
	else {
		for ($i=0; $i<results.length; $i++){
			pom_arr.push(results[$i]);
			if ($i<6){
				$('#showSetG').append("<div class='box'>"+results[$i]+"</div>");
			}
			else if ($i==results.length-1){
				$('#showSetG').append("<div class='box'> . . . </div>");
				$('#showSetG').append("<div class='box'>"+results[$i]+"</div>");
			}
		}
	}
	if (setG != []){
			if (setG2 != []){
				setG3 = pom_arr;
			}
			else{
				setG2 = pom_arr;
			}
		}
		else{
			setG = pom_arr;
		}
}
	
function generate1DArrayG(){
	var pom_arr = [];	
	var x = document.getElementById("form1DarrayG");
	val1 = x.elements[0].value;
	val2 = x.elements[1].value;
	val3 = x.elements[2].value;
		
		if (val1 < 11){
			for ($i=0; $i<val1; $i++){
				var item = Math.floor((Math.random() * val3) + val2);
				pom_arr.push(item);
				$('#show1DArrayG').append("<div class='box'>"+item+"</div>");
			}
		}
		else {
			for ($i=0; $i<val1; $i++){
				var item = Math.floor((Math.random() * val3) + val2);
				pom_arr.push(item);
				if ($i<6){
					$('#show1DArrayG').append("<div class='box'>"+item+"</div>");
				}
				else if ($i==val1-1){
					$('#show1DArrayG').append("<div class='box'> . . . </div>");
					$('#show1DArrayG').append("<div class='box'>"+item+"</div>");
				}
			}
		}
		if (array1DG != []){
			if (array1DG_2 != []){
				array1DG_3 = pom_arr;
			}
			else{
				array1DG_2 = pom_arr;
			}
		}
		else{
			array1DG = pom_arr;
		}
	}
	
	function generate2DArrayG(){
		var pom_arr = [[]];
		var x = document.getElementById("form2DarrayG");
		val1 = x.elements[0].value;
		val2 = x.elements[1].value;
		val3 = x.elements[2].value;
		val4 = x.elements[3].value;
		
		if (val1 < 6){
			if (val2 < 11){
				for ($i=0; $i<val1; $i++){
					for ($j=0; $j<val2; $j++){
						var item = Math.floor((Math.random() * val4) + val3);
						pom_arr[$i].push(item);
						$('#show2DArrayG').append("<div class='box'>"+item+"</div>");
					}
					$('#show2DArrayG').append("<br />");
					pom_arr.push([]);
				}
			}
			else {
				for ($i=0; $i<val1; $i++){
					for ($j=0; $j<val2; $j++){
						var item = Math.floor((Math.random() * val4) + val3);
						pom_arr[$i].push(item);
						if ($j<6){
							$('#show2DArrayG').append("<div class='box'>"+item+"</div>");
						}
						else if ($j==val2-1){
							$('#show2DArrayG').append("<div class='box'> . . . </div>");
							$('#show2DArrayG').append("<div class='box'>"+item+"</div>");
						}
					}
					$('#show2DArrayG').append("<br />");
					pom_arr.push([]);
				}
			}
		}
		else {
			if (val2 < 11){
				for ($i=0; $i<val1; $i++){
					for ($j=0; $j<val2; $j++){
						var item = Math.floor((Math.random() * val4) + val3);
						pom_arr[$i].push(item);
						if ($i < 3) {
							$('#show2DArrayG').append("<div class='box'>"+item+"</div>");
						}
						else if ($i == val1-1) {
							$('#show2DArrayG').append("<div class='box'>"+item+"</div>");
						}
					}
					if ($i < 3) {
						$('#show2DArrayG').append("<br />");
					}
					else if ($i == val1-2){
						$('#show2DArrayG').append("<div class='box'> . . . </div><br />");
						$('#show2DArrayG').append("<div class='box'> . . . </div><br />");
						$('#show2DArrayG').append("<div class='box'> . . . </div><br />");
					}
					pom_arr.push([]);
				}
			}
			else {
				for ($i=0; $i<val1; $i++){
					for ($j=0; $j<val2; $j++){
						var item = Math.floor((Math.random() * val4) + val3);
						pom_arr[$i].push(item);
						if ($i < 3){
							if ($j<6){
								$('#show2DArrayG').append("<div class='box'>"+item+"</div>");
							}
							else if ($j==val2-1){
								$('#show2DArrayG').append("<div class='box'> . . . </div>");
								$('#show2DArrayG').append("<div class='box'>"+item+"</div>");
							}
						}
						else if ($i == val1-1){
							if ($j<6){
								$('#show2DArrayG').append("<div class='box'>"+item+"</div>");
							}
							else if ($j==val2-1){
								$('#show2DArrayG').append("<div class='box'> . . . </div>");
								$('#show2DArrayG').append("<div class='box'>"+item+"</div>");
							}
						}
					}
					if ($i < 3) {
						$('#show2DArrayG').append("<br />");
					}
					else if ($i == val1-2){
						$('#show2DArrayG').append("<div class='box'> . . . </div><br />");
						$('#show2DArrayG').append("<div class='box'> . . . </div><br />");
						$('#show2DArrayG').append("<div class='box'> . . . </div><br />");
					}
					pom_arr.push([]);
				}
			}
		}
		if (array2G != []){
			if (array2G_2 != []){
				array2G_3 = pom_arr;
			}
			else{
				array2G_2 = pom_arr;
			}
		}
		else{
			array2G = pom_arr;
		}
	}
	
	function generateGraphG(){		
		var x = document.getElementById("formGraphG");
		val1 = x.elements[0].value;		
	}
	
	function generateListG(){
		var pom_arr = [];
		var x = document.getElementById("formListG");
		val1 = x.elements[0].value;
		val2 = 10;
		val3 = 10;
		
		if (val1 < 11){
			for ($i=0; $i<val1; $i++){
				var item = Math.floor((Math.random() * val3) + val2);
				pom_arr.push(item);
				$('#showListG').append("<div class='box'>"+item+"</div>");
			}
		}
		else {
			for ($i=0; $i<val1; $i++){
				var item = Math.floor((Math.random() * val3) + val2);
				pom_arr.push(item);
				if ($i<6){
					$('#showListG').append("<div class='box'>"+item+"</div>");
				}
				else if ($i==val1-1){
					$('#showListG').append("<div class='box'> . . . </div>");
					$('#showListG').append("<div class='box'>"+item+"</div>");
				}
			}
		}
		if (listG != []){
			if (listG2 != []){
				listG3 = pom_arr;
			}
			else{
				listG2 = pom_arr;
			}
		}
		else{
			listG = pom_arr;
		}
	}
	
	function generateSetG(){
		var pom_arr = [];
		var x = document.getElementById("formSetG");
		val1 = x.elements[0].value;
		val2 = 10;
		val3 = 10;
		
		if (val1 < 11){
			for ($i=0; $i<val1; $i++){
				var item = Math.floor((Math.random() * val3) + val2);
				pom_arr.push(item);
				$('#showSetG').append("<div class='box'>"+item+"</div>");
			}
		}
		else {
			for ($i=0; $i<val1; $i++){
				var item = Math.floor((Math.random() * val3) + val2);
				pom_arr.push(item);
				if ($i<6){
					$('#showSetG').append("<div class='box'>"+item+"</div>");
				}
				else if ($i==val1-1){
					$('#showSetG').append("<div class='box'> . . . </div>");
					$('#showSetG').append("<div class='box'>"+item+"</div>");
				}
			}
		}
		if (setG != []){
			if (setG2 != []){
				setG3 = pom_arr;
			}
			else{
				setG2 = pom_arr;
			}
		}
		else{
			setG = pom_arr;
		}
	}