/*
* Librarey for storing data and editing data
*/

//Dependencies

var fs=require('fs')
var path=require('path')

//Container for the module
var lib={};

//base directory of the data folder
lib.baseDir=path.join(__dirname,'/.././.data/')

//Write data to file
lib.create=function(dir,file,data,callback){
    //open the file for writing
    fs.open(lib.baseDir+dir+'/'+file+'.json','wx',function(err,fileDescriptor){
        if(!err && fileDescriptor){
            //Convert data to string
            var stringData=JSON.stringify(data);

            //write to file and close it
            fs.writeFile(fileDescriptor,stringData,function(err){
                if(!err){
                    fs.close(fileDescriptor,function(err){
                        if(!err){
                            callback(false);
                        }else{
                            callback('Error closing new file');
                        }
                    })
                }else{
                    callback('Error writing to new file')
                }
            })

        }else{
            callback('Could not create new file, it may already exits');
        }
    })
}


// Read data from a file
lib.read=function(dir,file,callback){
    fs.readFile(lib.baseDir+dir+'/'+file+'.json','utf8',function(err,data){
        callback(err,data)
    })
}

//update data inside the file
lib.update=function(dir,file,data,callback){
    //open the file for writing
    fs.open(lib.baseDir+dir+'/'+file+'.json','r+',function(err,fileDescriptor){
        if(!err && fileDescriptor){
            //Convert data to string
            var stringData=JSON.stringify(data);

            //Truencate the file
            fs.truncate(fileDescriptor,function(err){
                if(!err){
                    //write to the file
                    fs.writeFile(fileDescriptor,stringData,function(err){
                        if(!err){
                            fs.close(fileDescriptor,function(err){
                                if(!err){
                                    callback(false)
                                }else{
                                    callback('Error closing the file');
                                }
                            })
                        }else{
                            callback('Error writing to an existing file')
                        }
                    })

                }else[
                    callback('Error truncating file')
                ]
            })

        }else{
            callback('Could not open the file for update, it may doesnt exist')
        }
    })
}

//Delete the file

lib.delete=function(dir,file,callback){
    //unlink the file
    fs.unlink(lib.baseDir+dir+'/'+file+'.json',function(err){
        if(!err){
            callback(false)
        }else{
            callback('Error deleting the file')
        }
    })

}


//Export the module
module.exports=lib;