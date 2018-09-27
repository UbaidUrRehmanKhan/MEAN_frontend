import { AuthService } from './../../services/auth.service';
import { RegisterModel } from './../../models/registerModel';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  hide = true;
  user: RegisterModel = new RegisterModel();
  message = '';
  messageClass = '';
  emailValid;
  emailMessage;
  usernameValid;
  usernameMessage;
  // registerForm: FormGroup;
  // constructor(private formBuilder: FormBuilder) {}

  constructor(private authService: AuthService,
    private router: Router) {}
  ngOnInit() {

    // this.registerForm = this.formBuilder.group({
    //   'username': [this.user.username, [
    //     Validators.required
    //   ]],
    //   'email': [this.user.email, [
    //     Validators.required,
    //     Validators.email
    //   ]],
    //   'password': [this.user.password, [
    //     Validators.required,
    //     Validators.minLength(5),
    //     Validators.maxLength(20)
    //   ]],
    // });

  }


  // Function to check if e-mail is taken
  checkEmail() {
    // Function from authentication file to check if e-mail is taken
    this.authService.checkEmail(this.user.email).subscribe(data => {
      // Check if success true or false was returned from API
      if (!data.success) {
        this.emailValid = false; // Return email as invalid
        this.emailMessage = data.message; // Return error message
      } else {
        this.emailValid = true; // Return email as valid
        this.emailMessage = data.message; // Return success message
      }
    });
  }

  // Function to check if username is available
  checkUsername() {
    // Function from authentication file to check if username is taken
    this.authService.checkUsername(this.user.username).subscribe(data => {
      // Check if success true or success false was returned from API
      if (!data.success) {
        this.usernameValid = false; // Return username as invalid
        this.usernameMessage = data.message; // Return error message
      } else {
        this.usernameValid = true; // Return username as valid
        this.usernameMessage = data.message; // Return success message
      }
    });
  }

  onRegisterSubmit() {
    console.log(this.user);
    // const user = {
    //   email: this.registerForm.get('email').value, // E-mail input field
    //   username: this.registerForm.get('username').value, // Username input field
    //   password: this.registerForm.get('password').value // Password input field
    // };
    // console.log(user);
    this.authService.registerUser(this.user).subscribe(data => {
      // Resposne from registration attempt
      if (!data.success) {
        console.log(data);
        this.messageClass = 'alert alert-danger'; // Set an error class
        this.message = 'Sorry, ' + data.message; // Set an error message
      } else {
        this.messageClass = 'alert alert-success'; // Set a success class
        this.message = data.message; // Set a success message
        console.log('Saved');
      }
    });

  }

}
