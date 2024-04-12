const express=require('express')
const User=require('../models/User')
const router=express.Router()
const { body, validationResult } = require('express-validator');
//create use User using POST:/api/auth/createuser no login required

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
    let user=User.findOne({email:res.body.email})
    if(user)
    {
      return res.status(400).json({error:"Sorry the User Exist with Email"})
    }
    user=await User.create({
      name: req.body.name,
      password: req.body.password,
      email: req.body.email,
    })
    
    //.then(user => res.json(user))
    //.catch(err=>{console.log(err)
     // res.json({error:'This Email is already exist',message:err.message})})
});

module.exports=router