const Mongoose=require('mongoose');
const id=new Mongoose.Types.ObjectId();
console.log(id);
const isValid=Mongoose.Types.ObjectId.isValid('safasf');
console.log(isValid);