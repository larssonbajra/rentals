const config=require('config');
module.exports=function(){
    if (!config.get('jwtPrivateKey'))
{
    throw new Error('FATAL ERROR. jwtPrivateKey Not Defined in Environment Variable');
    
}
}