const Joi=require('joi');
const {genreSchema}=require('./genre');
const mongoose=require('mongoose');
const Movie= mongoose.model('Movies',new mongoose.Schema({
    title:{
        type:String,
        minlength:5,
        trim:true,
        maxlength:255,
        required:true},
  genre:{
      type:genreSchema,
    required:true},
  numberInStock:{
    type:Number,
    require:true,
    max:500,
    min:0},
    dailyRentalRate:{
        type:Number,
        require:true,
        max:50,
        min:0}
}));


function validateMovie(movie) {
    const schema = {
      title: Joi.string().min(5).max(50).required(),
      genreId:Joi.objectId().required(),
      numberInStock:Joi.number().min(0).required(),
      dailyRentalRate:Joi.number().min(0).required()
    };
    return Joi.validate(movie, schema);
}
exports.Movie=Movie;
exports.validate=validateMovie;
  