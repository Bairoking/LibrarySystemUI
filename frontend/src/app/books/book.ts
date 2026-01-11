import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class BookService {
  private api = 'http://localhost:5000/api/books';

  constructor(private http: HttpClient) {}

  getBooks() {
    return this.http.get<any[]>(this.api);
  }

  addBook(data: any) {
    return this.http.post(this.api, data);
  }

  borrowBook(id: string) {
    return this.http.post(`${this.api}/${id}/borrow`, {});
  }

  returnBook(id: string) {
    return this.http.post(`${this.api}/${id}/return`, {});
  }

  deleteBook(id: string) {
    return this.http.delete(`${this.api}/${id}`);
  }

}
