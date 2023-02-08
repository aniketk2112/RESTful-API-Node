install openssl
and run this command
openssl req -newKey rsa:2048 -new -nodes -x509 -days 3650 -keyout key.pen -out cert.pe

add this command and start the the server

var https=require('https')
var fs=require('fs')

//instantiate the http server
var httpServer=http.createServer(function(req.res){
unifiedServer(req,res);
})

//start the http server
httpServer.listen(config.port,function(){
 console.log("listening on port...")
})

//instantiate the https server
var httpsServerOptions={
	'key':fs.readFileSync('./https/key.pem'),
	'cert':fs.readFileSync('./https/cert.pem')
}
var httpsServer=https.createServer(httpsServerOptions,function(req.res){
unifiedServer(req,res);
})



//start the https server
httpsServer.listen(config.httpsPort,function(){
 console.log("listening on port...")
})