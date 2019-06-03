import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { User } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token = null;
  _id: any;
  imagePreview = '';

  constructor(private http: HttpClient) { }

  register(user: User): Observable<User> {
    return this.http.post<User>('/api/auth/register', user);
  }

  login(user: User): Observable<{ token: string }> {
    return this.http.post<{ token: string }>('/api/auth/login', user)
      .pipe(
        tap(
          ({ token }) => {
            localStorage.setItem('auth-token', token);
            this.setToken(token);
          }
        )
      );
  }

  profile(): Observable<{ token: string }> {
    return this.http.get<{ token: string }>('/api/auth/profile', { headers: { Authorization: `Bearer ${this.getToken()}` } });
  }

  setToken(token: String) {
    this.token = token;
  }

  saveToken(token: string): void {
    localStorage.setItem('auth-token', token);
    this.token = token;
  }

  getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('auth-token');
    }
    return this.token;
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  logOut() {
    this.setToken(null);
    localStorage.clear();
  }

  public getUserDetails(): User {
    const token = this.getToken();
    let payload;
    if (token) {
      payload = token.split('.')[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    } else {
      return null;
    }
  }

  public getUserProfile() {
    const user = this.getUserDetails();
    this.imagePreview = this.getUserDetails().avatarSrc;
    return user;
  }

  updateUserProfile(_id: any, name: string, phone: string, image?: File): Observable<{ token: string }> {

    const fd = new FormData();

    if (image) {
      fd.append('image', image, image.name);
    }

    fd.append('name', name);
    fd.append('phone', phone);

    return this.http.put<{ token: string }>('/api/auth/profile', fd)
      .pipe(
        tap(
          ({ token }) => {
            localStorage.setItem('auth-token', token);
            this.setToken(token);
          }
        )
      );
  }

}
