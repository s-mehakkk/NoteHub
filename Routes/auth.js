const express = require('express');
const User = require('../Models/Users');
const { body, validationResult } = require('express-validator');
const router = express.Router();

router.post('/',[
    body('name').isLength({ min: 3 }),
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),
], async (req, res)=>{
    //checking for the above constraints name length>=3 ....
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });

    }
    try {
        //checking if an user with this mail already exists
        let user = await User.findOne({email : req.body.email})
        if(user){
            return res.json({"err": "A user with this email already exists"})
        }
        //if it doesnt - creating a new user
        else{
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
          })
        res.json(user);
        }
        // Before using validation - 
        // let user = new User(req.body);
        // // user.name = req.body.name;
        // user.save()
        // res.status(200).send('user added');
    } catch (error) {
        res.status(500).json({"err":"some error occured"});
    }

})

module.exports = router;