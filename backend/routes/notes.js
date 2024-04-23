const express=require('express')
const fetchuser=require('../middleware/fetchuser')
const router=express.Router()
const Notes=require('../models/Notes')
const { body, validationResult } = require('express-validator');

//Routes 1:Fetch All notes of user//using GET

router.get('/fetchallnotes',fetchuser,async (req,res)=>{
    try {
        const notes=await Notes.find({user:req.user.id})
        res.json(notes)
    } catch(error){
        console.error(error.message);
        res.status(500).send("Internal Sever Error")
     }
})

//Route 2: add new Notes using POST
router.post('/addnote',fetchuser,[
    body('title','Add valid title').isLength({min:3}),
    body('description','Description must be 5 words').isLength({min:5})
],async (req,res)=>{
    //for varificATION
    try {
    const {title,description,tag}=req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const note=new Notes({
        title,description,tag,user:req.user.id
    })
    const savenotes=await note.save()
    res.json(savenotes)
 } catch(error){
    console.error(error.message);
    res.status(500).send("Internal Sever Error")
 }
})

//Route 3:Update existed notes /api/notes/updatenote ,login required
router.put('/updatenote/:id',fetchuser,async (req,res)=>{
    const {title,descrition,tag}=req.body;
    try {
    const newNote={};
    if(title){newNote.title=title}
    if(descrition){newNote.description=descrition}
    if(tag){newNote.tag=tag}
   //find the note to update and UPdate it
    let note=await Notes.findById(req.params.id)
    if(!note){return res.status(402).send('Not Found')}
// varify the user
if(note.user.toString() !== req.user.id){
    return res.status(401).send('not allowed')
}

note =await Notes.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
res.json(note)

} catch(error){
    console.error(error.message);
    res.status(500).send("Internal Sever Error")
 }
})

//Route 4:Delete existed notes /api/notes/deleteenote Using Delete ,login required

router.delete('/deletenote/:id',fetchuser,async (req,res)=>{
    try {
   //find the note to Delete and Delete it
    let note=await Notes.findById(req.params.id)
    if(!note){return res.status(402).send('Not Found')}
// varify the user
if(note.user.toString() !== req.user.id){
    return res.status(401).send('not allowed')
}
note =await Notes.findByIdAndDelete(req.params.id)
res.json({'Sucess':'Notes deleted Successfully',note:note})

} catch(error){
    console.error(error.message);
    res.status(500).send("Internal Sever Error")
 }
})
module.exports=router