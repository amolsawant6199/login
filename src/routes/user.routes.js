const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controllers')

router.route('/').get(userController.findAll)
        .post(userController.create);
router.get('/:id', userController.findOne);
module.exports = router;