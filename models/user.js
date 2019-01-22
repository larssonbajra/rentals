const jwt=require('jsonwebtoken');
const config=require('config');
const Joi=require('joi');
const mongoose=require('mongoose');
const userSchema=new mongoose.Schema({
  name:{
      type:String,
      required:true,
      minlength:5,
      maxlength:50},
    email:{type:String,
        required:true,
        unique:true,
        minlength:5,
        maxlength:255},
    password:{type:String,
        required:true,
        minlength:5,
        maxlength:255},
    isAdmin:Boolean
});
userSchema.methods.generateAuthToken=function(){
  const token=jwt.sign({_id:this._id,isAdmin:this.isAdmin},config.get("jwtPrivateKey"));
  return token;
}
const User= mongoose.model('user',userSchema);

  
function validateModel(user) {
    const schema = {
      name: Joi.string().min(5).max(50).required(),
      email: Joi.string().min(5).max(255).email().required(),
      password: Joi.string().min(5).max(255).required()
    };
  
    return Joi.validate(user, schema);
  }

  exports.User=User;
  exports.validate=validateModel;
