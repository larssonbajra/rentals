const auth=require('../middleware/auth');
const validateObjectId=require('../middleware/validateObjectId');
const asyncMiddleware=require('../middleware/async');
const admin=require('../middleware/admin');
const mongoose=require('mongoose');
const express = require('express');
const {Genre,validate}=require('../models/genre');
const router = express.Router();



router.get('/', async (req, res) => {
    //throw new Error('Could not get the genres.');
    const genres=await Genre.find().sort({name:1});
    res.send(genres);
 
  
});

router.post('/',auth, async (req, res) => {
  
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    const GenreCheck=await Genre.find({name:req.body.name});
    if (GenreCheck) return res.status(400).send('Genre Already Present');
  
    const genre = new Genre({
      
      name: req.body.name
    });
    await genre.save();
    res.send(genre);

  
  
 
});

router.put('/:id', async (req, res,next) => {
  try{ const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);
 const genre= await Genre.findByIdAndUpdate(req.params.id,
    {name:req.body.name},
{new:true});
  
  if (!genre) return res.status(404).send('The genre with the given ID was not found.');

  
  
  genre.name = req.body.name; 
  res.send(genre);
}
catch (ex)
{
  next();
}
 
});

router.delete('/:id',[auth,admin], async (req, res,next) => {
  try{
    const genre=await Genre.findByIdAndRemove(req.params.id);
   
    if (!genre) return res.status(404).send('The genre with the given ID was not found.');
  
  
  
    res.send(genre);

  }
 catch(ex)
 {
   next();
 }
});

router.get('/:id', validateObjectId,async (req, res) => {
  const genre=await Genre.findById(req.params.id);


  if (!genre) return res.status(404).send('The genre with the given ID was not found.');
  res.send(genre);
});


module.exports = router;