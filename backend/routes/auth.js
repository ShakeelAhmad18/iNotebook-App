const express=require('express')
const User=require('../models/User')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router=express.Router()
const { body, validationResult } = require('express-validator');
const fetchuser=require('../middleware/fetchuser')
//ROUTE 1:create use User using POST:/api/auth/createuser no login required

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
      res.status(500).send("Internal Sever Error")
   }
});

//ROUTE 2:autheticate a user /api/auth/login no login required

router.post('/login',[
  //if there are error ,then return bad request and error
  body('email','Enter a valid email').isEmail(),
  body('password','password cannot be balnk').exists()
],async (req,res)=>{

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

const {password,email}=req.body;
try{
  let user=await User.findOne({email})
  if(!user){
    return res.status(400).json({error:'Login in with correct Credientials'})
  }
const paasCompare=await bcrypt.compare(password,user.password)
if(!paasCompare){
  return res.status(400).json({error:'Login in with correct Credientials'})
}

const data={
  user:{
    id:user.id
  }
}

authToken=jwt.sign(data,JWT_SECRET)

res.json(authToken)

}catch(error){
  console.error(error.message)
  res.status(500).send('Internal Server Error')
}
})

//Route 3: Get user Details using POST /api/auth/loginuser: login required
router.post('/getuser',fetchuser,async (req,res)=>{
  try {
    const userid=req.user.id;
   const user=await User.findById(userid).select('-password')
    res.send(user)
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Internal Server Error')
  }


})

module.exports=router