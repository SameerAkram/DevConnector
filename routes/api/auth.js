const express = require('express');
const router = express.Router();// used to make short your main source file

//@route         GET api/auth
//@description   Test route
//@access        Public

router.get('/', (req, res) => res.send('Auth route'));

module.exports = router;