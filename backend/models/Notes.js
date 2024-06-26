const mongoose=require('mongoose')
const { Schema } = mongoose;
// make schema of Notes
const NotesSchema = new Schema({
   user:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'user'
   },
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