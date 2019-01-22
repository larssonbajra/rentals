const Joi=require('joi');
const mongoose=require('mongoose');
const Customer= mongoose.model('customer',new mongoose.Schema({
    isGold:{
        type:Boolean,
        default:false},
  name:{
      type:String,
      required:true,
      minlength:5,
      maxlength:50},
  phone:{
      type:String,
      required:true}
}));


function validateCustomer(customer) {
    const schema = {
      name: Joi.string().min(3).required(),
      
      phone:Joi.string().min(3).max(50).required(),
      isGold:Joi.boolean()
    };
    return Joi.validate(customer, schema);
}
exports.Customer=Customer;
exports.validate=validateCustomer;
  