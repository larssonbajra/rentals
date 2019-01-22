const auth=require('../middleware/auth');
const bcrypt=require('bcrypt');
const Joi=require('joi');
const _=require('lodash');
const express = require('express');
const {User}=require('../models/user');
const router = express.Router();



router.post('/', async (req, res) => {
  const { error } = validatePassword(req.body); 
  if (error) return res.status(400).send(error.details[0].message);
  let user= await User.findOne({email:req.body.email});
  if(!user) return res.status(400).send('email or password error');
  const validity=await bcrypt.compare(req.body.password,user.password)
  if (!validity) return  res.status(400).send('email or password error');
  const token=user.generateAuthToken();
  res.send(token);
  
});

function validatePassword(req) {
    const schema = {
      email: Joi.string().email().required(),
      password: Joi.string().required()
    };
  
    return Joi.validate(req, schema);
  }








module.exports = router;