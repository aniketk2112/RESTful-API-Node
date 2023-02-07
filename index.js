/*
main file
*/

//dependencies
var http=require('http')
var url=require('url')
var StringDecoder=require('string_decoder').StringDecoder


//create server
var server=http.createServer(function(req,res){

	// get the url and parse it
	var parsedUrl=url.parse(req.url,true);

	//get the path
	var path=parsedUrl.pathname;
	var trimmedPath=path.replace(/^\/+|\/+$/g,'');

	//get the HTTP method
	var method=req.method.toLowerCase()

	//get the query string as an object
	var queryStringObject=parsedUrl.query;

	//get the headers as object
	var headers=req.headers;

	//get the payload if exists
	var decoder=new StringDecoder('utf-8');
	var buffer='';
	req.on('data',function(data){
		buffer+=decoder.write(data)
	})
	req.on('end',function(){
		buffer+=decoder.end();

	//send the response
	res.end('Hello World');
	
	//log the request path
	console.log('Request recieved with this payload :',buffer)
	});
	
});


//asign port for a server
server.listen(3000,function(){
console.log('Listening on port 3000!')
})
