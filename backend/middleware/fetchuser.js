const jwt=require('jsonwebtoken')
const JWT_SECRET='Shakeelisgood18'

const fetchuser=(req,res,next)=>{
    //get user from the jwt token and id to request object
    const token=req.header('auth-token')
    if(!token){
        res.status(401).send({error:'login please with authenticate details'})
    }
   try {
    const data=jwt.verify(token,JWT_SECRET)
    req.user=data.user;
    next();  
   } catch (error) {
      res.status(401).send({error:'login please with authenticate details'})
   }  
}

module.exports=fetchuser