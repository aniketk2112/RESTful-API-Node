/*
* Request handlers
*/

//Dependencies
var _data=require('./data')
var helpers=require('./helpers')

//Define the handler
var handlers={};

//users handler
handlers.users=function(data,callback){
	var acceptableMethods=['post','get','put','delete']
    if(acceptableMethods.indexOf(data.method)>-1){
        handlers._users[data.method](data,callback);
    }else{
        callback(405)
    }

}

//container for the users submethods
handlers._users={
   

}

// users - post
//requires data:firstname lastname phome password
handlers._users.post=function(data,callback){
    //check that all required field are filled out
    var firstname=typeof(data.payload.firstname)=='string' && data.payload.firstname.trim().length>0 ? data.payload.firstname.trim() : false;
    var lastname=typeof(data.payload.lastname)=='string' && data.payload.lastname.trim().length>0 ? data.payload.lastname.trim() : false;
    var phone=typeof(data.payload.phone)=='string' && data.payload.phone.trim().length==10 ? data.payload.firstname.trim() : false;
    var password=typeof(data.payload.password)=='string' && data.payload.password.trim().length>0 ? data.payload.password.trim() : false;
    var tosAgreement=typeof(data.payload.tosAgreement)=='boolean' && data.payload.tosAgreement==true ? true : false;
    if(firstname && lastname && phone && password && tosAgreement){
        // make sure that the user doesnt already exits
        _data.read('users',phone,function(err,data){
            if(err){
                //hash the password
                var hashedPassword=helpers.hash(password)

                // create the user object
                if(hashedPassword){
                    var userObject={
                        'fistname':firstname,
                        'lastname':lastname,
                        'phone':phone,
                        'hashedPassword':hashedPassword,
                        'toAgreement':true
                    };
    
                    //storre the user
                    _data.create('users',phone,userObject,function(err){
                        if(!err){
                            callback(200)
                        }else{
                            console.log(err);
                            callback(500,{'Error':'Could not create the new user'})
                        }
                    })

                }else{
                    callback(500,{'Error':'Could not hash the user'})
                }
                

            }else{
                //user already exists
                callback(400,{'Error':'A user with this phone number already exists'})
            }
        })

    }else{
        callback(400,{'error':'Missing required fields'})
    }

}

// users - get
handlers._users.get=function(data,callback){
    
}

// users - put
handlers._users.put=function(data,callback){
    
}
// users - delete
handlers._users.delete=function(data,callback){
    
}

//ping handler
handlers.ping=function(data,callback){
	//callback a http status code, and a payload object
	callback(200);

}

//Not found handler
handlers.notFound=function(data,callback){
	callback(404);
}

// Export the module
module.exports=handlers;