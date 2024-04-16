const express=require('express')
const User=require('../models/User')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router=express.Router()
const { body, validationResult } = require('express-validator');
//create use User using POST:/api/auth/createuser no login required
const JWT_SECRET='Shakeelisgood18'

router.post('/createuser',[
   //if there are error ,then return bad request and error
   body('name','Enter valid name').isLength({ min: 3 }),
   body('email','Enter a valid email').isEmail(),
   body('password','Password must be atleat 8 character').isLength({ min: 8 })
],async (req,res)=>{
   const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
//check whether the user with same email exist
  try{
    let user=await User.findOne({email:req.body.email})
    if(user)
    {
      return res.status(400).json({error:"Sorry the User already Exist with this Email"})
    }
    //create a new user
    //for security of password we can BECRYPT Method for this propose
   const  salt=await bcrypt.genSalt(10)
   const secPass=await bcrypt.hash(req.body.password,salt)

    user=await User.create({
      name: req.body.name,
      password: secPass,
      email: req.body.email,
    });
    
   const data={
    user:{
      id:user.id
    }
   }

    const authToken=jwt.sign(data,JWT_SECRET)
     res.json(authToken)
   }
   catch(error){
      console.error(error.message);
      res.status(500).send("Some error is occured")
   }
});

module.exports=router