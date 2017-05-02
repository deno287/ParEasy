function check(em,paswd){

var mysql = mysql.connect();
var connection = mysql.createConnection({
   host     : 'localhost',
   user     : 'root',
   password : '',
   database : 'parallel'
 });
 
 connection.connect();
 
 connection.query('SELECT id_user from users WHERE email = ? AND password = ?', [ em, paswd ], function(err, rows, fields) {
   if (!err)
	   if (rows.length == 1){
		   console.log('The solution is: ', rows);
		   //return true;
	   }
	   else{
		    console.log('The solution is: empty'); 
			//return false;
	   }
   else
    console.log(err);
	return false;
 });
 
 connection.end();
}

//check(email,paswd);