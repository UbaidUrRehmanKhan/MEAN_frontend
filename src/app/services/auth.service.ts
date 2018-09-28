import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { map, tap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

const API_URL = 'http://localhost:8080';
const httpOptions = {
  headers: new Headers({
    'Content-Type': 'application/json'
  })
};


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public loggedIn = false;

  constructor(
    private http: Http,
    public jwtHelper: JwtHelperService
  ) {
    this.loggedIn = !!localStorage.getItem('auth_token');
   }
  // Function to register user accounts
  registerUser(user) {
    return this.http.post(API_URL + '/authentication/register', user).pipe(map(res => res.json()));
  }
  // Function to check if username is taken
  checkUsername(username) {
    return this.http.get(API_URL + '/authentication/checkUsername/' + username).pipe(map(res => res.json()));
  }
  // Function to check if e-mail is taken
  checkEmail(email) {
    return this.http.get(API_URL + '/authentication/checkEmail/' + email).pipe(map(res => res.json()));
  }
  // Function to login user
  login(user) {
    return this.http.post(API_URL + '/authentication/login',
    user, httpOptions).pipe(
      map(resp => {
        const response = resp.json();
        if ( response.success === true ) {
          localStorage.setItem('auth_token', response.token);
          localStorage.setItem('username', response.username);
          localStorage.setItem('role', response.role);
          this.loggedIn = true;
          return true;
        }
        return false;
      }));
  }

  logOut() {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    localStorage.clear();
    this.loggedIn = false;
  }

  isLoggedIn() {
    const decodedToken = localStorage.getItem('auth_token');
    return (
      !!localStorage.getItem('auth_token') &&
      !this.jwtHelper.isTokenExpired(decodedToken)
    );
  }

}
