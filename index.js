/*
main file
*/

//dependencies
var http=require('http')
var url=require('url')


//create server
var server=http.createServer(function(req,res){

	// get the url and parse it
	var parsedUrl=url.parse(req.url,true);

	//get the path
	var path=parsedUrl.pathname;
	var trimmedPath=path.replace(/^\/+|\/+$/g,'');

	//get the HTTP method
	var method=req.method.toLowerCase()

	//send the response
	res.end('Hello World');
	
	//log the request path
	console.log('request recieved on path:'+trimmedPath+'with this method:'+method)
})


//asign port for a server
server.listen(3000,function(){
console.log('Listening on port 3000!')
})
