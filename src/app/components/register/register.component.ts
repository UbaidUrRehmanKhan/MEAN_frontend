import { AuthService } from './../../services/auth.service';
import { RegisterModel } from './../../models/registerModel';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  user: RegisterModel = new RegisterModel();
  registerForm: FormGroup;
  hide = true;
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      'username': [this.user.username, [
        Validators.required
      ]],
      'email': [this.user.email, [
        Validators.required,
        Validators.email
      ]],
      'password': [this.user.password, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(20)
      ]],
    });

  }


  onRegisterSubmit() {
    const user = {
      email: this.registerForm.get('email').value, // E-mail input field
      username: this.registerForm.get('username').value, // Username input field
      password: this.registerForm.get('password').value // Password input field
    };
  }

}
