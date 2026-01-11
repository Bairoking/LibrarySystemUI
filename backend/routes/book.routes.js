const router = require('express').Router();
const controller = require('../controllers/book.controller');
const { auth } = require('../middleware/auth.middleware');

router.post('/', auth(['admin']), controller.createBook);
router.get('/', auth(), controller.getBooks);
router.get('/:id', auth(), controller.getBook);
router.put('/:id', auth(['admin']), controller.updateBook);
router.delete('/:id', auth(['admin']), controller.deleteBook);

router.post('/:id/borrow', auth(['user']), controller.borrowBook);
router.post('/:id/return', auth(['user']), controller.returnBook);

module.exports = router;
