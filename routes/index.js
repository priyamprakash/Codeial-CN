const express = require('express');
const router = express.Router();

const homeController = require('../controllers/home_controllers');


console.log('Router Loaded');

router.get('/',homeController.home);
router.use('/users', require('./users'));
router.use('/posts', require('./posts'));

module.exports = router;