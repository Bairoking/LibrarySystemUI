import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.html',
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class ManageUsers implements OnInit {
  users: User[] = [];
  searchTerm = '';
  page = 1;
  pageSize = 5;

  private api = 'http://localhost:5000/api/users';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.http.get<User[]>(this.api).subscribe({
      next: res => this.users = res,
      error: () => alert('Failed to load users')
    });
  }

  get filteredUsers() {
    return this.users.filter(u =>
      `${u.name} ${u.email} ${u.role}`
        .toLowerCase()
        .includes(this.searchTerm.toLowerCase())
    );
  }

  get paginatedUsers() {
    const start = (this.page - 1) * this.pageSize;
    return this.filteredUsers.slice(start, start + this.pageSize);
  }

  deleteUser(userId: string) {
    if (!confirm('Are you sure?')) return;

    this.http.delete(`${this.api}/${userId}`).subscribe({
      next: () => this.loadUsers(),
      error: err => alert(err.error?.message || 'Delete failed')
    });
  }
}
