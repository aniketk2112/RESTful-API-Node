/*
* Helpers for various tasks
*/


// Dependencies
var crypto=require('crypto')
var config=require('./config')

//container for all the helpers
var helpers={};




//Create a sha256 hash
helpers.hash=function(str){
    if(typeof(str)=='string' && str.length > 0){
        var hash=crypto.createHmac('sha256',config.hashingSecret).update(str).digest('hex');
        return hash;
    }else{
        return false;
    }
}



//parse a json string to an object in all cases, without throwing
helpers.parseJsonToObject=function(str){
    try{
        var obj=JSON.parse(str);
        return obj;
    }catch(e){
        return {}
    }
}











// Export the module
module.exports=helpers