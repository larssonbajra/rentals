const winston=require('winston');
module.exports=function(err,req,res,next){
    winston.error(err.message,err);

    //error
    //warn
    //info
    //verbose
    //silly
    res.status(500).send('Cannot connect to database');
}