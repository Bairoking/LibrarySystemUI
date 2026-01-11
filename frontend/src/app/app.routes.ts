import { Routes } from '@angular/router';
import { Login } from './auth/login/login';
import { Register } from './auth/register/register';
import { BookList } from './books/book-list/book-list';
import { AdminDashboard } from './admin/admin-dashboard/admin-dashboard';
import { ManageBooks } from './admin/manage-books/manage-books';
import { ManageUsers } from './admin/manage-users/manage-users';
import { AuthGuard } from './guards/auth-guard';
import { AdminGuard } from './guards/admin-guard';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'register', component: Register },

  // USER
  { path: 'books', component: BookList },

  // ADMIN
  { path: 'admin', component: AdminDashboard },
  { path: 'admin/manage-books', component: ManageBooks },
  { path: 'admin/manage-users', component: ManageUsers },

  { path: '', redirectTo: 'login', pathMatch: 'full' }
];
