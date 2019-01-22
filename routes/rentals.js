const auth=require('../middleware/auth');
const {Rental,validate}=require('../models/rental');
const {Customer}=require('../models/customer');
const {Movie}=require('../models/movie');
const mongoose=require('mongoose');
const Fawn=require('fawn');
const express = require('express');
const router = express.Router();
Fawn.init(mongoose);
router.get('/', async (req, res) => {
  const rentals=await Rental.find().sort({rentalFee:1});
  res.send(rentals);
});

router.post('/',auth, async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);
  const customer= await Customer.findById(req.body.customerId);
  if (!customer) return res.status(400).send('No Customer Found');
  const movie= await Movie.findById(req.body.movieId);
  if (!movie) return res.status(400).send('No Movie Found');
  if (movie.numberInStock===0) return res.status(400).send('No Stock Left');
  const currentDate=Date.now();
  let rental = new Rental({
    customer:{name:customer.name,phone:customer.phone,isGold:customer.isGold},
    movie:{title:movie.title,dailyRentalRate:movie.dailyRentalRate},
    dateOut:currentDate,
    dateReturned:'2018-06-16',
    rentalFee:50
  });
  try
  {
    new Fawn.Task()
     .save('rentals',rental)
     .update('movies',{_id:movie._id},{
      $inc:{numberInStock:-1}

      })
     .run();
     res.send(rental)
  }
  catch(ex)
  {
    res.status(500).send('something failed');
  }
  
  ;
});

router.put('/:id', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);
  const customer= await Customer.findById(req.body.customerId);
  const movie= await Movie.findById(req.body.movieId);
 const rental= await Rental.findByIdAndUpdate(req.params.id,
    {  customer:{name:customer.name,phone:customer.phone,isGold:customer.isGold},
    movie:{title:movie.title,dailyRentalRate:movie.dailyRentalRate},
    dateOut:Date.now,
    dateReturned:2018-06-16,
    rentalFee:50
    },
{new:true});
  
  if (!rental) return res.status(404).send('The rental with the given ID was not found.');

  
  
  //customer.name = req.body.name; 
  res.send(rental);
});

router.delete('/:id', async (req, res) => {
  const rental=await Rental.findByIdAndRemove(req.params.id);
   
  if (!rental) return res.status(404).send('The rental with the given ID was not found.');



  res.send(rental);
});

router.get('/:id', async (req, res) => {
  const rental=await Rental.findById(req.params.id);


  if (!rental) return res.status(404).send('The rental with the given ID was not found.');
  res.send(rental);
});

 


module.exports = router;