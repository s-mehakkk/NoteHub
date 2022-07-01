const express = require('express');
const User = require('../Models/Users');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jswt = require('jsonwebtoken');
const router = express.Router();
const fetchUser = require('../middleware/fetchUser');

const secretKey = 'mommyneedshersugar';

//ROUTE 1
router.post('/signup', [
    body('name').isLength({ min: 3 }),
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),
], async (req, res) => {
    //checking for the above constraints name length>=3 ....
    // i.e. errors in validation strings
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });

    }
    try {
        //checking if an user with this mail already exists
        let user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.json({ "err": "A user with this email already exists" })
        }
        //if it doesnt - creating a new user
        else {

            const salt = await bcrypt.genSalt(10);
            const secPass = bcrypt.hashSync(req.body.password, salt);
            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: secPass,
            })
            const data = {
                user: {
                    id: user.id
                }
            };
            const authToken = jswt.sign(data, secretKey);
            res.json(authToken);

            //res.json(user);
        }
        // Before using validation - 
        // let user = new User(req.body);
        // // user.name = req.body.name;
        // user.save()
        // res.status(200).send('user added');
    } catch (error) {
        res.status(500).json({ "err": "some error occured" });
        console.log(error.message);
    }

})

//ROUTE 2
router.post('/signin', [
    body('email', 'Enter a valid email address').isEmail(),
    body('password', "Password can't be blank").exists(),
], async (req, res) => {

    try {
        const { email, password } = req.body;
        //checking for the above constraints name length>=3 ....
        // i.e. errors in validation strings
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        //checking if an user with this mail exists or not
        let user = await User.findOne({ email: req.body.email })
        if (!user) {
            return res.status(400).json({ "err": "Sedlyf you'll be doomed in 10 seconds" })
        }
        const passCompare = await bcrypt.compare(password, user.password);
        if (!passCompare) {
            return res.status(400).json({ "err": "Sedlyf you'll be doomed in 10 seconds" })
        }

        const data = {
            user: {
                id: user.id
            }
        };
        const authToken = jswt.sign(data, secretKey);
        res.json(authToken);


    }

    catch (error) {
        console.log(error.message);
        res.status(500).json({ "err": "some error occured"});
    }
})

//ROUTE 3
router.get('/getUser', fetchUser, async(req, res)=>{
try {
    const userId = req.user.id;
    const user = await User.findOne({_id: userId}).select("-password")
    res.json(user);
} catch (error) {
    console.log(error.message);
    res.status(500).json({ "err": "some error occured"});
}
})

module.exports = router;