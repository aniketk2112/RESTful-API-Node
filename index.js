/*
main file
*/

//dependencies
var http=require('http')
var url=require('url')
var StringDecoder=require('string_decoder').StringDecoder
var config=require('./config')
var fs=require('fs')
var _data=require('./lib/data')


//TESTING
// @TODO delete this
// _data.create('test','newFile',{'foo':'bar'},function(err){
// 	console.log('this was the error',err)
// })
// _data.read('test','newFile',function(err,data){
// 	console.log('this was the error',err,'and this was the data'.data)
// })
// _data.update('test','newFile',{'fizz':'buzz'},function(err){
// 	console.log('this was the error',err)
// })

_data.delete('test','newFile',function(err){
	console.log('this was the error',err)
})


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

		//choose the handler this request should go.
		var chooseHandler=typeof(router[trimmedPath])!=='undefined' ? router[trimmedPath]:handlers.notFound

		//construct the data object to send to the handler
		var data={
			'trimmedPath':trimmedPath,
			'queryStringObject':queryStringObject,
			'method':method,
			'headers':headers,
			'payload':buffer
		}

		//route the request to the handler specified in the router
		chooseHandler(data,function(statusCode,payload){
			//use the statuscode calles back to the handler, or default to 200
			statusCode=typeof(statusCode)=='number' ? statusCode:200

			//use the payload called back to the handler, or defaulto to an empty object
			payload=typeof(payload)=='object' ? payload:{};

			//Convert the payload to a string
			var payloadString=JSON.stringify(payload);

			//return the response
			res.setHeader('Content-Type','application/json')
			res.writeHead(statusCode);
			res.end(payloadString);

			//log the request path
			console.log('Returning this response :',statusCode,payloadString)
		});
		});
});


//asign port for a server
//use set NODE_ENV=production then node index.js
server.listen(config.port,function(){
console.log('Listening on port '+config.port+' in '+config.envName+'!')
})

//Define the handler
var handlers={};

//ping handler
handlers.ping=function(data,callback){
	//callback a http status code, and a payload object
	callback(200);

}

//Not found handler
handlers.notFound=function(data,callback){
	callback(404);
}


//Define a request router
var router={
'ping':handlers.ping
};

