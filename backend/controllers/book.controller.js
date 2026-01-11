const Book = require('../models/book.model');

exports.createBook = async (req, res) => {
  const book = await Book.create(req.body);
  res.status(201).json(book);
};

exports.getBooks = async (req, res) => {
  const books = await Book.find().populate('borrowedBy', 'name email');
  res.json(books);
};

exports.getBook = async (req, res) => {
  const book = await Book.findById(req.params.id);
  res.json(book);
};

exports.updateBook = async (req, res) => {
  const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(book);
};

exports.deleteBook = async (req, res) => {
  await Book.findByIdAndDelete(req.params.id);
  res.json({ message: 'Book deleted' });
};

exports.borrowBook = async (req, res) => {
  const book = await Book.findById(req.params.id);

  if (!book.available)
    return res.status(400).json({ message: 'Book not available' });

  book.available = false;
  book.borrowedBy = req.user.id;
  await book.save();

  res.json({ message: 'Book borrowed successfully' });
};

exports.returnBook = async (req, res) => {
  const book = await Book.findById(req.params.id);

  if (!book.borrowedBy || book.borrowedBy.toString() !== req.user.id)
    return res.status(403).json({ message: 'Not allowed' });

  book.available = true;
  book.borrowedBy = null;
  await book.save();

  res.json({ message: 'Book returned successfully' });
};
