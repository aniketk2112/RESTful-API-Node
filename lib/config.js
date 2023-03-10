/*
* Create and export configuration variables
*/

//Container for all the environments
var environments={};

//Staging (dfault) environment
environments.staging={
    'port':3000,
    'httpPort':3000,
    'httpsPort':3001,
    'envName':'staging',
    'hashingSecret':'thisIsSecret'
};

//Production Environment
environments.production={
    'port':5000,
    'httpPort':5000,
    'httpsPort':5001,
    'envName':'production',
    'hashingSecret':'thisIsAlsoSecret'
}

//Determine which environment was passed as a command-line argument
var currentEnvironment=typeof(process.env.NODE_ENV)=='string' ? process.env.NODE_ENV.toLowerCase() : '';

//Check that the current environment is one is one of the environment above, if not, default to staging.
var environmentToExport=typeof(environments[currentEnvironment])=='object' ? environments[currentEnvironment]: environments.staging;


//Export the module
module.exports=environmentToExport;