require ('express-async-errors');
require('winston-mongodb');
const winston=require('winston');
module.exports=function(){
    // process.on('uncaughtException',(ex)=>{
    //     //console.log('WE GOT UNCAUGHT EXCEPTION');  //This is if we catch uncaught exceptions
    //     winston.error(ex.message,ex);
    //     //process.exit(1);
    // });
    //Using above process.on or below method to catch the error foe exceptions
     winston.handleExceptions(
        new winston.transports.Console({colorize:true,prettyPrint:true}), 
        new winston.transports.File({filename:'exceptionFile.log'}));
   
   //--------------------------------------------------------------------------------------------------
        process.on('unhandledRejection',(ex)=>{
        //console.log('WE GOT UNHANDLED REJECTION'); //this is for unhandled promise rejections
        winston.error(ex.message,ex);
        //process.exit(1);
    });
    //or for easy method, just throw ex and winston will catch as a exception to a rejection (LIKE BELOW)
    
    // process.on('unhandledRejection',(ex)=>{
    //     throw ex;
    // });
    winston.add(winston.transports.File,{filename:'logfile.log'});
    //winston.add(winston.transports.MongoDB,{db: 'mongodb://localhost/vidly'});
    winston.add(winston.transports.MongoDB,{db: 'mongodb://localhost/vidly',level:'info'});
    
    
    //throw new Error('Something went wrong in startUp');
    // const p=Promise.reject(new Error('Failed miserably'));
    // p.then(()=>console.log('Done'));
    
    
}