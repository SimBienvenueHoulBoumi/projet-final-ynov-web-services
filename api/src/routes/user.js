const express = require('express');
const router = express.Router();

const logger = require('../middlewares/logger');
const auth = require('../middlewares/auth');


const userControllers = require('../controllers/user');

router.get('/', [auth, logger], userControllers.getUserList)
router.get('/:id', [auth, logger], userControllers.getUser)
router.post('/signup', [logger], userControllers.createUser)
router.post('/login', [logger], userControllers.login)
router.put('/:id', [auth, logger], userControllers.updateUser)
router.delete('/:id', [auth, logger], userControllers.deleteUser)

module.exports = router;