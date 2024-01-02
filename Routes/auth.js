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
    let success = false;
    //checking for the above constraints name length>=3 ....
    // i.e. errors in validation strings
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, error: errors.array() });
    }
    try {
        //checking if an user with this mail already exists
        let user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.json({ success, error: "An account with this email already exists, pls sign-in" })
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
            success = true;
            res.json({success, authToken});

            //res.json(user);
        }
        // Before using validation - 
        // let user = new User(req.body);
        // // user.name = req.body.name;
        // user.save()
        // res.status(200).send('user added');
    } catch (error) {
        res.status(500).json({ success, error: "some error occured" });
        console.log(error.message);
    }

})

//ROUTE 2
router.post('/signin', [
    body('email', 'Enter a valid email address').isEmail(),
    body('password', "Password can't be blank").exists(),
], async (req, res) => {
    let success = false;
    try {
        const { email, password } = req.body;
        //checking for the above constraints name length>=3 ....
        // i.e. errors in validation strings
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({success, error: errors.array() });
        }
        //checking if an user with this mail exists or not
        let user = await User.findOne({ email: req.body.email })
        if (!user) {
            return res.status(400).json({success, error: "Provide valid credentials. If you do-not have an account, pls sign-up" })
        }
        const passCompare = await bcrypt.compare(password, user.password);
        if (!passCompare) {
            return res.status(400).json({success, error: "Provide valid credentials. If you do-not have an account, pls sign-up" })
        }

        const data = {
            user: {
                id: user.id
            }
        };
        const authToken = jswt.sign(data, secretKey);
        success = true;
        res.status(200).json({success, authToken});


    }

    catch (error) {
        console.log(error.message);
        res.status(500).json({success, error: "some error occured" });
    }
})

//ROUTE 3
router.get('/getUser', fetchUser, async (req, res) => {
    let success = false;
    try {
        const userId = req.user.id;
        // fetch everything other than password
        const user = await User.findOne({ _id: userId }).select("-password");
        success = true;
        res.json({success, user});
    } catch (error) {
        console.log(error.message);
        res.status(500).json({success, error: "some error occured" });
    }
})

module.exports = router;