import { Component, OnInit } from '@angular/core';
import { BookService } from '../book';
import { Comment } from '@angular/compiler';
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
  selector: 'app-book-list',
  templateUrl: './book-list.html',
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class BookList implements OnInit {
  books: Book[] = [];
  filteredBooks: Book[] = [];

  searchTerm = '';
  currentPage = 1;
  itemsPerPage = 5;
  totalPages = 1;

  userId: string | null = null;

  constructor(private service: BookService) {}

  ngOnInit() {
    this.userId = localStorage.getItem('userId');
    this.loadBooks();
  }

  loadBooks() {
    this.service.getBooks().subscribe({
      next: (res: Book[]) => {
        this.books = res;
        this.applyFilters();
      },
      error: (err) => alert('Failed to load books')
    });
  }

  applyFilters() {
    // filter by search
    this.filteredBooks = this.books.filter(b =>
      b.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      b.author.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    this.totalPages = Math.ceil(this.filteredBooks.length / this.itemsPerPage);
    this.currentPage = 1;
  }

  get paginatedBooks(): Book[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredBooks.slice(start, start + this.itemsPerPage);
  }

  borrow(bookId: string) {
    this.service.borrowBook(bookId).subscribe({
      next: () => this.loadBooks(),
      error: (err) => alert(err.error.message || 'Borrow failed')
    });
  }

  return(bookId: string) {
    this.service.returnBook(bookId).subscribe({
      next: () => this.loadBooks(),
      error: (err) => alert(err.error.message || 'Return failed')
    });
  }

  canReturn(book: Book): boolean {
    return !book.available && book.borrowedBy?._id === this.userId;
  }

  canBorrow(book: Book): boolean {
    return book.available;
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) this.currentPage = page;
  }
}
