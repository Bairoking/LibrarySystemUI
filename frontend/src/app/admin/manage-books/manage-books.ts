import { Component, OnInit } from '@angular/core';
import { BookService } from '../../books/book';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Book {
  _id: string;
  title: string;
  author: string;
  isbn: string;
  available: boolean;
  borrowedBy?: { _id: string; name: string } | null;
}

@Component({
  selector: 'app-manage-books',
  templateUrl: './manage-books.html',
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class ManageBooks implements OnInit {
  books: Book[] = [];

  title = '';
  author = '';
  isbn = '';

  // 🔹 Search & Pagination
  searchTerm = '';
  page = 1;
  pageSize = 5;

  constructor(private service: BookService) {}

  ngOnInit() {
    this.loadBooks();
  }

  loadBooks() {
    this.service.getBooks().subscribe({
      next: (res: Book[]) => this.books = res,
      error: () => alert('Failed to load books')
    });
  }

  // 🔹 Filtering
  get filteredBooks() {
    return this.books.filter(b =>
      `${b.title} ${b.author} ${b.isbn}`
        .toLowerCase()
        .includes(this.searchTerm.toLowerCase())
    );
  }

  // 🔹 Pagination
  get paginatedBooks() {
    const start = (this.page - 1) * this.pageSize;
    return this.filteredBooks.slice(start, start + this.pageSize);
  }

  addBook() {
    if (!this.title || !this.author || !this.isbn) {
      return alert('All fields required');
    }

    this.service.addBook({
      title: this.title,
      author: this.author,
      isbn: this.isbn
    }).subscribe({
      next: () => {
        alert('Book added successfully');
        this.title = this.author = this.isbn = '';
        this.loadBooks();
      },
      error: err => alert(err.error?.message || 'Add failed')
    });
  }

  deleteBook(bookId: string) {
    this.service.deleteBook(bookId).subscribe({
      next: () => this.loadBooks(),
      error: err => alert(err.error?.message || 'Delete failed')
    });
  }
}
