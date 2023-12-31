const express = require('express');
const router = express.Router();// used to make short your main source file
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');

const { check, validationResult } = require('express-validator');
const User = require('../../models/User')

//@route         POST api/users
//@description   Register User
//@access        Public

router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })],

    async (req, res) => {
        const errors = validationResult(req);


        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, password } = req.body;
        try {
            //See if user exist
            let user = await User.findOne({ email });

            if (user) {
                return res.status(400).json({
                    errors: [{
                        msg: 'User already exist'
                    }]
                });
            }

            //Get users gravatar
            const avatar = gravatar.url(email, {
                s: '200',
                r: 'pg',
                d: '404'
            })

            user = new User({
                name,
                email,
                avatar,
                password
            });
            //Encrypt password

            const salt = await bcrypt.genSalt(10);

            user.password = await bcrypt.hash(password, salt);

            await user.save();
            //Return jsonwebtoken

            res.send('register');

        } catch (error) {
            console.error(error.message);
        }

        //See if user exist

        //Get users gravatar

        //Encrypt password

        //Return jsonwebtoken

        res.send('user route');
    });

module.exports = router;