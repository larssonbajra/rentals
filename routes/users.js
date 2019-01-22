const auth=require('../middleware/auth');
const config=require('config');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
const _=require('lodash');
const mongoose=require('mongoose');
const express = require('express');
const {User,validate,validatePassword}=require('../models/user');
const router = express.Router();



router.get('/', async (req, res) => {
  const users=await User.find().sort({name:1});
  res.send(users);
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);
  let user= await User.findOne({email:req.body.email});
  if(user) return res.status(400).send('User already present with the email');
  user = new User(_.pick(req.body,['name','email','password']));
  const salt=await bcrypt.genSalt(10);
  user.password=await bcrypt.hash(user.password,salt);
  await user.save();
  const token=user.generateAuthToken();
  res.header('x-auth-token',token).send(_.pick(user,['_id','name','email']));
});

router.get('/me',auth, async (req, res) => {
  const user=await User.findById(req.user._id).select('-Password');
  res.send(user);
});







module.exports = router;