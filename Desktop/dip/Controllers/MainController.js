var express = require('express')
  , http = require('http');

var multer = require('multer');
var app = express();
var mkdirp = require('mkdirp');
var childProcess = require('child_process');
const url = require('url');
var fs = require('fs');

//global.user = 2;

var port = process.env.PORT || 8031;
var host = process.env.HOST || "127.0.0.1";

var server = http.createServer(app).listen(port, host, function() {
  console.log("Server listening to %s:%d within %s environment",
              host, port, app.get('env'));
});

app.use(express.static(__dirname + '/Assets'));
app.use(express.static(__dirname + '/Views'));
app.use(express.static(__dirname + '/images'));

app.get('/', function(req, res) {
	res.sendfile('Views/welcome_logout.html')
});

var io = require('socket.io')( { resource: '/pario/socket.io' });
var io = io.listen(server);
io.setMaxListeners(0);

var mysql = require('mysql');
 var connection = mysql.createConnection({
   host     : '',
   user     : '',
   password : '',
   database : ''
 });
connection.connect();

sha256 = require('js-sha256').sha256;
var user_id = 0;

io.on('connection', function(other){
	other.emit('news', { hello: 'world' });
	other.on('my other event', function (em, pswd, next) {
		 email = em['em'];
		 pass = sha256(em['pswd']);
 
		 connection.query('SELECT id_user from users WHERE email = ? AND password = ?', [ email, pass ], function(err, rows, fields) {
		   if (!err)
			   if (rows.length == 1){
				   user_id = rows[0]['id_user'];
				   other.emit('info', {info: 1, id: user_id});
			   }
			   else{
				   other.emit('info', {info: 2,id: user_id});
			   }
		   else
			  other.emit('info', {info: 2, id: user_id});
		 });
	});
});

io.on('connection', function(registration){
	registration.emit('reg', { hello: 'world' });
	registration.on('reg data', function (rem, rname, rsur, rpass) {
		 email = rem['rem'];
		 name = rem['rname'];
		 surname = rem['rsur'];
		 pass = sha256(rem['rpass']);
		 var post  = {email: email, firstName: name, lastName: surname, password: pass};
 
		 connection.query('INSERT INTO users SET ?', post, function(err, result) {
		 if (!err)
			 if (result['affectedRows'] == 1){
			   registration.emit('reload', {reload: true});
			 }
		   else
				registration.emit('reload', {reload: false});
		 });
	});
});

io.on('connection', function(projects){
	projects.emit('projects', { hello: 'world' });
	projects.on('list', function (data) {
		connection.query('SELECT * from projects WHERE user_id = ?', [ data['user_id'] ], function(err, rows, fields) {
		if (!err)
			projects.emit('table data', {rows});
		else
			projects.emit('table data', 'empty');
		 })
	});
	projects.on('delete project', function (data){
		connection.query('DELETE from projects WHERE project_id = ?', [ data['id'] ], function(err, result) {
			if (err) throw err;
			//console.log('Deleted ' + result.affectedRows + ' rows');
			projects.emit('delete note', {hello: "ok"});
		});
	});
	projects.on('list shared', function (data) {
		connection.query('SELECT * from projects WHERE shared = 1', function(err, rows, fields) {
		if (!err){
			projects.emit('table shared data', {rows});
		}
		else{
			projects.emit('table shared data', 'empty');}
		})
	});
	projects.on('copy project', function (id) {
		connection.query('SELECT * from projects WHERE project_id = ?', [ id['id'] ], function(err, rows, fields) {
			if (!err)
				var new_project_id;
				var old_user = rows[0]['user_id'];
				var old_project_id = id['id'];
				var new_user = id['user'];
				var copy_cpu = rows[0]['CPU_structures'];
				var copy_gpu = rows[0]['GPU_structures'];
				var copy_name = rows[0]['project_name'];
				var copy_desc = rows[0]['description'];
				var fs = require('fs');
				var copy  = {user_id:new_user, CPU_structures:copy_cpu, GPU_structures:copy_gpu, project_name:copy_name, shared: 0, description:copy_desc};
				connection.query('INSERT INTO projects SET ?', copy, function(err, result) {
				if (!err){
					if (result['affectedRows'] == 1){		
						new_project_id = result.insertId;
						
						fs.readFile('./projects/'+old_user+'/'+old_project_id+'/start.js', 'utf8', function (err,data1) {
							if (err) {
								return console.log(err);
							}
							fs.readFile('./projects/'+old_user+'/'+old_project_id+'/core.cl', 'utf8', function (err,data2) {
								if (err) {
									return console.log(err);
								}
								fs.readFile('./projects/'+old_user+'/'+old_project_id+'/prepare.js', 'utf8', function (err,data3) {
									if (err) {
										return console.log(err);
									}
									fs.readFile('./projects/'+old_user+'/'+old_project_id+'/take.js', 'utf8', function (err,data4) {
										if (err) {
											return console.log(err);
										}
										fs.readFile('./projects/'+old_user+'/'+old_project_id+'/plus.js', 'utf8', function (err,data5) {
											if (err) {
												return console.log(err);
											}
											fs.readFile('./projects/'+old_user+'/'+old_project_id+'/result.js', 'utf8', function (err,data6) {
												if (err) {
													return console.log(err);
												}
											
												mkdirp(('./projects/'+new_user+'/'+new_project_id), function(err) {
													console.log('create');
												});
												mkdirp(('./projects/'+new_user+'/'+new_project_id+'/images'), function(err) {
													console.log('create');
												});
																						
												projects.emit('copy note', { del: 'copied' });
												projects.on('create data file', function (info){
													fs.writeFile(('./projects/'+new_user+'/'+new_project_id+'/start.js'), data1, function(err) {
														if(err) {
															return console.log(err);
														}
														//console.log("The copy was saved!", data1);
													});
													fs.writeFile(('./projects/'+new_user+'/'+new_project_id+'/core.cl'), data2, function(err) {
														if(err) {
															return console.log(err);
														}
														//console.log("The copy was saved!");
													});
													fs.writeFile(('./projects/'+new_user+'/'+new_project_id+'/prepare.js'), data3, function(err) {
														if(err) {
															return console.log(err);
														}
														//console.log("The copy was saved!");
													});
													fs.writeFile(('./projects/'+new_user+'/'+new_project_id+'/take.js'), data4, function(err) {
														if(err) {
															return console.log(err);
														}
														//console.log("The copy was saved!");
													});
													fs.writeFile(('./projects/'+new_user+'/'+new_project_id+'/plus.js'), data5, function(err) {
														if(err) {
															return console.log(err);
														}
														//console.log("The copy was saved!");
													});	
													fs.writeFile(('./projects/'+new_user+'/'+new_project_id+'/result.js'), data6, function(err) {
														if(err) {
															return console.log(err);
														}
														//console.log("The copy was saved!");
													});														
												});
											});
										});
									});
								});
							});
						});
					}
				}
				});
		});
	});
	
	projects.on('share project', function (id) {
		var share = id['id'];
		var xxx = id['xxx'];
		if (xxx){
			xxx = 1;
		}
		else{
			xxx = 0;
		}
		connection.query('UPDATE projects SET shared = ? WHERE project_id = ?', [xxx, share], function (err, result) {
			if (!err)
				if (result['affectedRows'] == 1){
					projects.emit('share note', { share: 'ok' });
				}
				else 
					projects.emit('share note', { share: 'ne ok' });
		});
	});
	projects.emit('saving file', { hello: 'world' });
	projects.on('sending file', function (data) {
		var u_id = data['id'];
		var p_id = data['project'];
		var fs = require('fs');
		var global_content = "";
		projects.emit('get files', { hello: 'world' });
		projects.on('super file', function (data) {
			// precital som function take;
			var content_take = data['file4'];			
			var pom_string = content_take.toString();
			content_take = "";
			pom_string = pom_string.split("\n");
			for (line of pom_string){
				if (line.includes("parallel.read(")){
					line = line.replace("read(","read(kern,cq,");
					global_content += (line+"\n");
				}
				else{
					content_take += (line+"\n");
				}
			}
			//precital som function prepare;
			var content_prepare = data['file3'];
			//var content_docas = data['file6']+content_take+content_prepare;
			//precital som function start;
			var content_start = data['file1'];
			var pom_string = content_start;
			content_start = "";
			pom_string = pom_string.split("\n");
			for (line of pom_string){
				if (line.includes("cycle++")){
					content_start += (line+("\n"));
					var get_prepare = data['file3'];
					get_prepare = get_prepare.split("\n");
					for (line_in of get_prepare){
						if (line_in.includes("copy")){
							content_start += (line_in+("\n"));
						}
					}
				}
				else if (line.includes("parallel.run(")){
					var pomoc = line.split("parallel.run(");
					content_start += ("var cq = parallel.run(kern, "+pomoc[1]+"\n");
					content_start += global_content;
				}
				else if (line.includes("parallel.parameter(")){
					var helper = line.split("parallel.parameter(");
					content_start += ("parallel.parameter(kern, "+helper[1]+"\n");
				}
				else if (line.includes("buildProgram(")){
					line = line.split("buildProgram(");
					content_start += line[0]+"buildProgram(source,";
					content_start += (line[1]+"\n");
				}
				else if (line.includes("return")){
					line = line.split("return");
					content_start += "console.log(";
					if (line[1].includes(";")){
						line[1] = line[1].replace(";","");
					}
					content_start += (line[1]+");");
				}
				else{
					content_start += (line+"\n");
				}
			}
			console.log(content_start);
			
			//var content_docas = data['file6']+content_take+content_prepare+content_start;
			//console.log(content_docas);
			
			var content1 = data['file1'];
			
			
			var content2 = data['file2'];
			var content3 = data['file3'];
			var content4 = data['file4'];
			var content5 = data['file5'];
			var content7 = data['file7'];
			//var content6 = data['file6']+content3+content4+content7+content5;
			var content6 = data['file6']+content_take+content_prepare+content_start;
			//console.log(content6);
			
			fs.writeFile(('./projects/'+u_id+'/'+p_id+'/start.js'), content1, function(err) {
				if(err) {
					return console.log(err);
				}
				//console.log("The file was saved!");
			});
			fs.writeFile(('./projects/'+u_id+'/'+p_id+'/core.cl'), content2, function(err) {
				if(err) {
					return console.log(err);
				}
				//console.log("The file was saved!");
			});
			fs.writeFile(('./projects/'+u_id+'/'+p_id+'/prepare.js'), content3, function(err) {
				if(err) {
					return console.log(err);
				}
				//console.log("The file was saved!");
			});
			fs.writeFile(('./projects/'+u_id+'/'+p_id+'/take.js'), content4, function(err) {
				if(err) {
					return console.log(err);
				}
				//console.log("The file was saved!");
			});
			fs.writeFile(('./projects/'+u_id+'/'+p_id+'/plus.js'), content5, function(err) {
				if(err) {
					return console.log(err);
				}
				//console.log("The file was saved!");
			});
			fs.writeFile(('./projects/'+u_id+'/'+p_id+'/result.js'), content6, function(err) {
				if(err) {
					return console.log(err);
				}
				//console.log("The file was saved!");
			});
		});
	});
	projects.emit('reading file', { hello: 'world' });
	projects.on('reading file data', function (data) {
		var u_id = data['id'];
		var p_id = data['project'];
		var fs = require('fs');
		var read1;
		var read2;
		var read3;
		var read4;
		var read5;
		fs.readFile('./projects/'+u_id+'/'+p_id+'/start.js', 'utf8', function (err,data1) {
			if (err) {
				projects.emit('the read result', { info:"error" });
				projects.on('send for prechod', function (data) {	
					var prechod_project = data['project'];
					connection.query('SELECT * from projects WHERE project_id = ? ', [ prechod_project ], function(err, rows, fields) {
					    if (!err)
						    if (rows.length == 1){
								var prechod_cpu = rows[0]['CPU_structures'];
								var prechod_gpu = rows[0]['GPU_structures'];
								projects.emit("send structures prechod", { cpu:prechod_cpu, gpu:prechod_gpu });
						    }
					});
				});
			}
			else{
				fs.readFile('./projects/'+u_id+'/'+p_id+'/core.cl', 'utf8', function (err,data2) {
					fs.readFile('./projects/'+u_id+'/'+p_id+'/prepare.js', 'utf8', function (err,data3) {
						fs.readFile('./projects/'+u_id+'/'+p_id+'/take.js', 'utf8', function (err,data4) {
							fs.readFile('./projects/'+u_id+'/'+p_id+'/plus.js', 'utf8', function (err,data5) {
								projects.emit('the read result', { info:"ok", file1:data1, file2:data2, file3:data3, file4:data4, file5:data5 });
							});
						});
					});
				});
			}
		});
	});
	
	projects.emit('reading shared file', { hello: 'world' });
	projects.on('reading shared data', function (data) {
		var p_id = data['project'];
		
		connection.query('SELECT * from projects WHERE project_id = ?', [ p_id ], function(err, rows, fields) {
			if (!err)
				var old_user = rows[0]['user_id'];	
				var desc = rows[0]['description'];	
				var name = rows[0]['project_name'];				
				var fs = require('fs');
				var read1;
				var read2;
				var read3;
				var read4;
				var read5;
				fs.readFile('./projects/'+old_user+'/'+p_id+'/start.js', 'utf8', function (err,data1) {
					if (err) {
						return console.log(err);
					}
					fs.readFile('./projects/'+old_user+'/'+p_id+'/core.cl', 'utf8', function (err,data2) {
						if (err) {
							return console.log(err);
						}
						fs.readFile('./projects/'+old_user+'/'+p_id+'/prepare.js', 'utf8', function (err,data3) {
							if (err) {
								return console.log(err);
							}
							fs.readFile('./projects/'+old_user+'/'+p_id+'/take.js', 'utf8', function (err,data4) {
								if (err) {
									return console.log(err);
								}
								fs.readFile('./projects/'+old_user+'/'+p_id+'/plus.js', 'utf8', function (err,data5) {
									if (err) {
										return console.log(err);
									}
									projects.emit('the shared result', { file1:data1, file2:data2, file3:data3, file4:data4, file5:data5, name:name, desc:desc});
								});
							});
						});
					});
				});
		});
	});	
});

io.on('connection', function(createNewProject){
	createNewProject.emit('start', { hello: 'world' });
	createNewProject.on('sendName', function (sendData) {
		project_name = sendData['send'];
		project_desc = sendData['desc'];
		user_id = sendData['user_id'];
		var post  = {user_id:user_id, project_name:project_name, CPU_structures:"", GPU_structures:"", shared:0, description:project_desc};
		 connection.query('INSERT INTO projects SET ?', post, function(err, result) {
			 if (!err){
				if (result['affectedRows'] == 1){
						console.log('tu');
						mkdirp(('./projects/'+user_id+'/'+result.insertId), function(err) {
						});
						mkdirp(('./projects/'+user_id+'/'+result.insertId+'/images'), function(err) {
						});
														
						fs.writeFile(('./projects/'+user_id+'/'+result.insertId+'/start.js'), "", function(err) {
							if(err) {
								console.log(err);
							}
							var core_content = "void core()\n{\n}\n";
							fs.writeFile(('./projects/'+user_id+'/'+result.insertId+'/core.cl'), core_content, function(err) {
								if(err) {
									console.log(err);
								}
								fs.writeFile(('./projects/'+user_id+'/'+result.insertId+'/prepare.js'), "", function(err) {
									if(err) {
										console.log(err);
									}
									fs.writeFile(('./projects/'+user_id+'/'+result.insertId+'/take.js'), "", function(err) {
										if(err) {
											console.log(err);
										}
										fs.writeFile(('./projects/'+user_id+'/'+result.insertId+'/plus.js'), "", function(err) {
											if(err) {
												console.log(err);
											}
											fs.writeFile(('./projects/'+user_id+'/'+result.insertId+'/result.js'), "", function(err) {
												if(err) {
													console.log(err);
												}
											});
										});
									});
								});
							});							
						});							
						createNewProject.emit('createResult', {reload: true, id: result.insertId });		
				}
				else{
					createNewProject.emit('createResult', {reload: false});
				}
			 }
			 else{
				 console.log(err);
				 createNewProject.emit('createResult', {reload: false});
			 }
		 });
		 
	});
});

io.on('connection', function(selectStructures){
	var project_id = selectStructures.handshake.headers.referer;
	var iddd = selectStructures.handshake.session;
	var res = project_id.split("?");
	res[1] = project_id.split("&");
	project_id = res[1][1];
	
	connection.query('SELECT * from projects WHERE project_id = ?', [ project_id ], function(err, rows, fields) {
		if (!err){
	    
			selectStructures.emit('start select', { id: project_id, data: rows });
			selectStructures.on('send selected', function (postData) {
				cpu = postData['cpu'].join();
				gpu = postData['gpu'].join();
				id = postData['id'];
				user = postData['user'];
		 
				 connection.query('UPDATE projects SET CPU_structures = ? , GPU_structures = ? Where project_id = ?', [cpu, gpu, id], function (err, result) {
				 if (!err)
					if (result['affectedRows'] == 1){
						
						fs.readFile('./projects/'+user+'/'+id+'/prepare.js', 'utf8', function (err,data_prepare) {
							if (err) {
								return console.log(err);
							}
							fs.readFile('./projects/'+user+'/'+id+'/take.js', 'utf8', function (err,data_take) {
								if (err) {
									return console.log(err);
								}
								
								if (data_prepare == ""){
									var pom_ar1 = 0;
									var pom_ar2 = 0;
									var pom_lst = 0;
									var pom_set = 0;
									var pom_grp = 0;
									cpu = cpu.split(",");
									for (var i=0; i<cpu.length; i++){
										if(i%2 == 0){
											if (cpu[i] == 'attr1'){		
												pom_ar1++;
												data_prepare += ("var " + cpu[i+1] + " = [];"+ "\r");
											}
											else if (cpu[i] == 'attr2'){		
												pom_ar2++;
												data_prepare += ("var " + cpu[i+1] + " = [];"+ "\r");
											}
											else if (cpu[i] == 'attr3'){		
												pom_lst++;
												data_prepare += ("var " + cpu[i+1] + " = [];"+ "\r");
											}
											else if (cpu[i] == 'attr4'){		
												pom_set++;
												data_prepare += ("var " + cpu[i+1] + " = [];"+ "\r");
											}
											else if (cpu[i] == 'attr5'){		
												pom_grp++;
												data_prepare += ("var " + cpu[i+1] + " = [];"+ "\r");
											}
										}
									}
								}
								
								if (data_take == ""){
									gpu = gpu.split(",");
									var pom_ar1 = 0;
									var pom_ar2 = 0;
									var pom_lst = 0;
									var pom_set = 0;
									var pom_grp = 0;
									for (var i=0; i<gpu.length; i++){
										if(i%2 == 0){
											if (gpu[i] == 'attr1'){		
												pom_ar1++;
												data_take += ("var " + gpu[i+1] + " = [];"+ "\r");
											}
											else if (gpu[i] == 'attr2'){		
												pom_ar2++;
												data_take += ("var " + gpu[i+1] + " = [];"+ "\r");
											}
											else if (gpu[i] == 'attr3'){		
												pom_lst++;
												data_take += ("var " + gpu[i+1] + " = [];"+ "\r");
											}
											else if (gpu[i] == 'attr4'){		
												pom_set++;
												data_take += ("var " + gpu[i+1] + " = [];"+ "\r");
											}
											else if (gpu[i] == 'attr5'){		
												pom_grp++;
												data_take += ("var " + gpu[i+1] + " = [];"+ "\r");
											}
										}
									}
								}
								
								fs.writeFile(('./projects/'+user+'/'+id+'/prepare.js'), data_prepare, function(err) {
									if(err) {
									return console.log(err);
									}
									fs.writeFile(('./projects/'+user+'/'+id+'/take.js'), data_take, function(err) {
										if(err) {
											return console.log(err);
										}
									});
								});
							});							
						});
						selectStructures.emit('updateResult', {reload: true });
					 }
				   else
						selectStructures.emit('updateResult', {reload: false });
				 });
			})
		}		
		else
			console.log('chyba');
		 });
});

io.on('connection', function(sendingID){
	var project_id = sendingID.handshake.headers.referer;
	var res = project_id.split("?");
	res[1] = project_id.split("&");
	project_id = res[1][1];
	sendingID.emit('send id to url', { id: project_id });
});

io.on('connection', function(updatingName){
	var project_id = updatingName.handshake.headers.referer;
	var res = project_id.split("?");
	var res = project_id.split("?");
	res[1] = project_id.split("&");
	project_id = res[1][1];
	updatingName.emit('start thinking', { id: project_id });
	updatingName.on('sendNewName', function (sendData) {
		project_name = sendData['send'];
		project_desc = sendData['desc'];
		console.log(project_desc);
		connection.query('UPDATE projects SET project_name = ?, description = ? Where project_id = ?', [project_name, project_desc, project_id], function (err, result) {
			if (!err)
				if (result['affectedRows'] == 1){
					updatingName.emit('updateResult', {reload: true, id: project_id});
				}
				else
					updatingName.emit('updateResult', {reload: false });
		});
		 
	});
});

io.on('connection', function(createStructures){
	var project_id = createStructures.handshake.headers.referer;
	var res = project_id.split("?");
	var res = project_id.split("?");
	res[1] = project_id.split("&");
	project_id = res[1][1];
	createStructures.emit('start create', { id: project_id });
	createStructures.on('get data', function (projectID) {
		connection.query('SELECT * from projects WHERE project_id = ?', [ project_id ], function(err, rows, fields) {
		 if (!err)
			createStructures.emit('get structures', {CPU: rows[0]['CPU_structures'], GPU: rows[0]['GPU_structures']});
		else
			projects.emit('table data', 'empty');
		 })
	});
});

function runScript(scriptPath, callback) {
/*
    // keep track of whether callback has been invoked to prevent multiple invocations
    var invoked = false;
	
    var process = childProcess.fork(scriptPath);

    // listen for errors as they may prevent the exit event from firing
    process.on('error', function (err) {
        if (invoked) return;
        invoked = true;
        callback(err);
    });

    // execute the callback once the process has finished running
    process.on('exit', function (code) {
        if (invoked) return;
        invoked = true;
        //var err = code === 0 ? null : new Error('exit code ' + code);
        callback(code);
    });
*/

}

io.on('connection', function(trying){
	trying.emit('trying', { id: 'ok'});
	trying.on('try file', function (ids) {
		uid = ids['user_id'];
		pid = ids['project_id'];
		//runScript('./projects/'+uid+'/'+pid+'/start.js', function (err) {
			//if (err) throw err;
			//console.log(err);
		//});
		
		
		/*
		const cp = require('child_process');
		const n = cp.fork('./projects/'+uid+'/'+pid+'/result.js');
		n.on('message', (m) => {
			result = m['foo'];	
			console.log('Your result is: ');
			console.log(result);				
			trying.broadcast.emit('popup try', {id: result});
			//trying.emit('popup try',{ id: result} );
		});
		n.send({ hello: 'world' });
		*/
		
		/*
		var exec = require('child_process').exec;
		exec('node ./projects/'+uid+'/'+pid+'/result.js', function(error, stdout, stderr) {
			console.log(stdout);
			trying.broadcast.emit('popup try', {id: stdout});
		});	
		*/
		//setInterval(function(){
		/*var spawn = require('child_process').spawn;
		var child = spawn('node', ['./projects/'+uid+'/'+pid+'/result.js']);
			child.stdout.on('data', function(data) {
				console.log('stdout: ' + data);
				trying.broadcast.emit('popup try', {id: data.toString()});
			});
			//console.log("nedostanem sa");
			//trying.broadcast.emit('popup try', {id: stdout});
		*/	
		//}, 2000);
		/*
		const child_process = require('child_process');
		var workerProcess = child_process.spawn('node', ['./projects/'+uid+'/'+pid+'/result.js']);
		var dt = "";

		workerProcess.stdout.on('data', function (data) {
			console.log('stdout: ' + data);
			dt = data;
			trying.broadcast.emit('popup try', {id: dt});
		});
		*/
		fs.readFile('./projects/'+uid+'/'+pid+'/result.js', 'utf8', function (err,result_content) {
			if (err) {
				return console.log(err);
			}
			var module_content = "module.exports = \n { \n start: function(){ \n";
			module_content += result_content;
			module_content += "} \n }";
			
			fs.writeFile(('./projects/'+uid+'/'+pid+'/module.js'), module_content, function(err) {
					if(err) {
						return console.log(err);
					}
					delete require.cache[require.resolve('./projects/'+uid+'/'+pid+'/module.js')]
					var program = require('./projects/'+uid+'/'+pid+'/module.js');
					program.start();
				});
		});
		
		
	});
	trying.emit('trying shared', { id: 'ok'});
	trying.on('try shared file', function (ids) {
		pid = ids['project_id'];
		connection.query('SELECT user_id from projects WHERE project_id = ? ', [ pid ], function(err, rows, fields) {
		   if (!err)
			   if (rows.length == 1){
					uid = rows[0]['user_id'];
					//runScript('./projects/'+uid+'/'+pid+'/result.js', function (err) {
						//if (err) throw err;
					//});
					//setInterval(function(){
						var spawn = require('child_process').spawn;
						var child = spawn('node', ['./projects/'+uid+'/'+pid+'/result.js']);
						child.stdout.on('data', function(data) {
							console.log('stdout: ' + data);
							trying.broadcast.emit('popup try', {id: data.toString()});
						});
						//console.log("nedostanem sa");
						//trying.broadcast.emit('popup try', {id: stdout});
			
					//}, 2000);


			   }
		 });
	});
});

io.on('connection', function(boss){
	boss.emit('a', { id: 'ok'});
	boss.on('b', function (data) {			
		boss.broadcast.emit('c', {id: data});
		boss.disconnect(0);
	});
});

io.on('connection', function(img){
	img.emit('get images', { data: 'ok'});
	img.on('data for images', function (data) {	
		var usr = data['user'];
		var prj = data['project'];
		var fs = require('fs');
		var files = fs.readdirSync(__dirname+'/projects/'+usr+'/'+prj+'/images/');
		for (var i=0; i<files.length; i++){
			fs.readFile('./projects/'+usr+'/'+prj+'/images/'+files[i], 'utf8', function (err,image) {
				img.emit('image back', { info:"ok", file:image });
			});
		}
		img.on('have images', function(data){
			img.emit('send imgs', {imgs:files});
		});
	});
});

io.on('connection', function(data){
	var fs = require('fs');
	data.emit('skusam image', {info:'mozes'});
	data.on('posielam image', function(postImage){
		var subor = postImage['img'];
		var nazov = postImage['nazov'];
				//console.log(nazov);
		var user = postImage['user'];
		var project = postImage['project'];
		fs.writeFile(('./projects/'+user+'/'+project+'/images/'+nazov+'.b64'), subor, 'binary', function(err) {
			if(err) {
				return console.log(err);
			}
			//console.log("The image was saved!");
			fs.readFile('./projects/'+user+'/'+project+'/images/'+nazov+'.b64', 'utf8', function (err,image) {
				data.emit('image back', { info:"ok", file:image });
			});
		});
	});	
})

io.on('connection', function(example){
	example.emit('reading example', {info:"read"});
	example.on('reading example num', function(num){
		var num = num['num'];
		var fs = require('fs');
		fs.readFile('./projects/99/'+num+'/start.js', 'utf8', function (err,data1) {
			if (err) {
				return console.log(err);
			}
			fs.readFile('./projects/99/'+num+'/core.cl', 'utf8', function (err,data2) {
				if (err) {
					return console.log(err);
				}
				fs.readFile('./projects/99/'+num+'/prepare.js', 'utf8', function (err,data3) {
					if (err) {
						return console.log(err);
					}
					fs.readFile('./projects/99/'+num+'/take.js', 'utf8', function (err,data4) {
						if (err) {
							return console.log(err);
						}
						example.emit('reading example result', { file1:data1, file2:data2, file3:data3, file4:data4 });
					});
				});
			});
		});
		
	})
});

io.on('connection', function(lectures){
	lectures.emit('lectures', { id: 'ok'});
	lectures.on('try lecture', function (num) {
		var num = num['num'];
		//const cp = require('child_process');
		//setInterval(function(){
		var spawn = require('child_process').spawn;
		var child = spawn('node', ['./projects/99/'+num+'/result.js']);
			child.stdout.on('data', function(data) {
				console.log('stdout: ' + data);
				lectures.broadcast.emit('popup try', {id: data.toString()});
			});
			//console.log("nedostanem sa");
			//trying.broadcast.emit('popup try', {id: stdout});
			
		//}, 2000);
		//const n = cp.fork('./projects/lectures/'+num+'/result.js');
		//n.on('message', (m) => {
		//	result = m['foo'];	
		//	console.log('Your result is: ');
		//	console.log(result);				
		//	lectures.broadcast.emit('popup try', {id: result});
			//trying.emit('popup try',{ id: result} );
		//});
		//n.send({ hello: 'world' });
	});
});

io.on('connection', function(welcome){
	welcome.emit("welcome", {data:"ok"});
	welcome.on("welcome name", function(id){
		var id = id['id'];
		connection.query('SELECT * from users WHERE id_user = ? ', [ id ], function(err, rows, fields) {
		   if (!err)
			   if (rows.length == 1){
					welcome.emit("welcome data", {first:rows[0]['firstName'], last:rows[0]['lastName']})
			   }
		 });
	});
});

io.on('connection', function(welcome){
	welcome.emit("name", {data:"ok"});
	welcome.on("name id", function(id){
		var id = id['id'];
		connection.query('SELECT * from projects WHERE project_id = ? ', [ id ], function(err, rows, fields) {
		   if (!err)
			   if (rows.length == 1){
					welcome.emit("name data", {project_name:rows[0]['project_name'], project_desc:rows[0]['description']})
			   }
		 });
	});
});

io.on('connection', function(changes){
	changes.emit("new request", {data:"ok"});
	changes.on("new request data", function(datas){
		var user = datas['user'];
		var project = datas['project'];
		var command = [];
		var names = [];
		connection.query('SELECT CPU_structures from projects WHERE project_id = ? ', [ project ], function(err, rows, fields) {	
			if (!err)
				if (rows.length == 1){
					var object = rows[0]['CPU_structures'].split(',');
					for (var item=0; item<object.length; item++){
						if (item%2 == 1){
							var pom = object[item];
							command.push([pom]);
							names.push(pom);
						}
					}
					
					fs.readFile('./projects/'+user+'/'+project+'/result.js', 'utf8', function (err,content) {
						if (err) {
							return console.log(err);
						}
						if (content.includes("return")){
							var result_content = content+"\n";
						}
						else{
							var result_content = content+"\n";
							result_content += ("return [" + command + "]");
						}
							
						var module_content = "module.exports = \n { \n start: function(){ \n";
						module_content += result_content;
						module_content += "} \n }";
								
						fs.writeFile(('./projects/'+user+'/'+project+'/module.js'), module_content, function(err) {
							if(err) {
								return console.log(err);
							}
							delete require.cache[require.resolve('./projects/'+user+'/'+project+'/module.js')];
							var program = require('./projects/'+user+'/'+project+'/module.js');
							var result = program.start();	
							changes.emit("new request result", {res:result, names:names});				
						});
					});
					
			   }
		 });
	});
});

io.on('connection', function(lect){
	lect.emit("new lecture", {data:"ok"});
	lect.on("new lecture data", function(datas){
		var project = datas['project'];	
		var command = [];
		var names = [];
		connection.query('SELECT CPU_structures from projects WHERE project_id = ? ', [ project ], function(err, rows, fields) {	
			if (!err)
				if (rows.length == 1){
					var object = rows[0]['CPU_structures'].split(',');
					for (var item=0; item<object.length; item++){
						if (item%2 == 1){
							var pom = object[item];
							command.push([pom]);
							names.push(pom);
						}
					}		

					fs.readFile('./projects/99/'+project+'/result.js', 'utf8', function (err,content) {
						if (err) {
							return console.log(err);
						}
						if (content.includes("return")){
							var result_content = content+"\n";
						}
						else{
							var result_content = content+"\n";
							result_content += ("return [" + command + "]");
						}
							
						var module_content = "module.exports = \n { \n start: function(){ \n";
						module_content += result_content;
						module_content += "} \n }";
								
						fs.writeFile(('./projects/99/'+project+'/module.js'), module_content, function(err) {
							if(err) {
								return console.log(err);
							}
							delete require.cache[require.resolve('./projects/99/'+project+'/module.js')];
							var program = require('./projects/99/'+project+'/module.js');
							var result = program.start();	
							lect.emit("new lecture result", {res:result, names:names});				
						});
					});			
	}
		 });
	});
});

io.on('connection', function(title){
	title.on("want title", function(data){
		var project = data['id'];	
		connection.query('SELECT * from projects WHERE project_id = ? ', [ project ], function(err, rows, fields) {	
			if (!err)
				if (rows.length == 1){
					title.emit("sending title", {title:rows[0]['project_name'], desc:rows[0]['description']});	
				}
		});
	});
});
