const express = require('express');
const router = express.Router();

router.use('/users', require('./users'));
router.use('/post', require('./post'));
router.use('/volunter', require('./volunter'));
router.use('/comment', require('./comment'));


module.exports = router;