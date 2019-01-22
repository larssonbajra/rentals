const Joi=require('joi');

const mongoose=require('mongoose');
const Rental= mongoose.model('rental',new mongoose.Schema({
    customer:{type:new mongoose.Schema({
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
    },
    ),required:true},
    movie:{type:new mongoose.Schema({
        title:{
            type:String,
            minlength:5,
            trim:true,
            maxlength:255,
            required:true},
  
        dailyRentalRate:{
            type:Number,
            require:true,
            max:50,
            min:0}
    }),required:true},
    dateOut:{type:Date,default:Date.now,required:true},
    dateReturned:{type:Date},
    rentalFee:{type:Number, min:0}



    
}));


function validateRental(rental) {
    const schema = {
      customerId: Joi.objectId().required(),
      
      movieId:Joi.objectId().required()
      
    };
    return Joi.validate(rental, schema);
}
exports.Rental=Rental;
exports.validate=validateRental;
  