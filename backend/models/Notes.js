const mongoose=require('mongoose')

const NotesSchema = new Schema({
    title:{
       type:String,
       require:true,
    },
    description:{
       type:String,
       required:true,
    },
    tag:{
       type:String,
       default:'general'
    },
    Date:{
      type:Date,
      default:Date.now
    }
   });
 
   module.exports=mongoose.model('notes',NotesSchema)