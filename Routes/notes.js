const express = require('express');
const Notes = require('../Models/Notes');
const { body, validationResult } = require('express-validator');
const fetchUser = require('../middleware/fetchUser');
const { findByIdAndUpdate } = require('../Models/Users');

const router = express.Router()

//ROUTE 1 add a note
router.post('/addnote', fetchUser, [
    body('title').isLength({ min: 3 }),
    body('description').isLength({ min: 5 }),
], async (req, res)=>{
    //checking for errors in validation strings
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(req.body)
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        let newNote = await Notes.create({
            user:req.user.id,
            title: req.body.title,
            description: req.body.description,
        })
        res.status(200).json(newNote);
    } catch (error) {
        res.status(500).json({ "err": "some error occured" });
        console.log(error.message);
    }
})

//Route 2 Fetch all notes for a user
router.get('/fetchnotes', fetchUser, async(req, res)=>{
    try {
        const userId = req.user.id;
        const notes = await Notes.find({'user': userId});
        res.json(notes);
    } catch (error) {
        res.status(500).json({ "err": "some error occured" });
        console.log(error.message);
    }
})

//ROUTE 3 update an existing note
router.put('/updatenote/:id', fetchUser, async(req, res)=>{
    try {
        let {title, description} = req.body;
        let newNote ={};
        if(title){newNote.title = title};
        if(description){newNote.description = description};

        let note = await Notes.findById(req.params.id);
        if(!note){
            return res.status(404).send("Can't update");
        }
        if(note.user.toString() !== req.user.id ){
            return res.status(401).send("Not allowed")
        }

        note = await Notes.findByIdAndUpdate(req.params.id, {$set : newNote}, {new:true});
        res.json(note);

    } catch (error) {
        res.status(500).json({ "err": "some error occured" });
        console.log(error.message);
    }
})

//ROUTE 4 delete an existing note
router.delete('/deletenote/:id', fetchUser, async(req,res)=>{
    try {

        let note = await Notes.findById(req.params.id);
        if(!note){
            return res.status(404).send("Not allowed");
        }
        if(note.user.toString() !== req.user.id ){
            return res.status(401).send("Not allowed")
        }

        note = await Notes.findByIdAndDelete(req.params.id);
        res.json({"status":"successfully deleted"});
    } catch (error) {
        res.status(500).json({ "err": "some error occured" });
        console.log(error.message);
    }
})



module.exports = router;