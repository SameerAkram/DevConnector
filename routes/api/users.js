const express = require('express');
const router = express.Router();// used to make short your main source file
const { check, validationResult } = require('express-validator');

//@route         POST api/users
//@description   Register User
//@access        Public

router.post('/', [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Invalid email'),
    body('password').notEmpty().withMessage('Name is required')
], (req, res) => {
    console.log(req.body);
    res.send('User route')

});

module.exports = router;