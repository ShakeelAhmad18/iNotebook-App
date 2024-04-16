const mongoose=require('mongoose')

const mongoURI='mongodb://localhost:27017/iNotebook'

//here we want to connect with mongoDB 
const connetTOmongo=()=>{
    mongoose.connect(mongoURI,).then(()=>console.log('connected to mongooose Succesfully'))
}

module.exports=connetTOmongo;