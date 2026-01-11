const router = require('express').Router();
const controller = require('../controllers/user.controller');
const { auth } = require('../middleware/auth.middleware');

router.get('/', auth(['admin']), controller.getUsers);
router.delete('/:id', auth(['admin']), controller.deleteUser);

module.exports = router;
