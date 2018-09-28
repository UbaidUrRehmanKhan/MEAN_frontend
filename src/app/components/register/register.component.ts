import { AuthService } from './../../services/auth.service';
import { RegisterModel } from './../../models/registerModel';
import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {MatDialogRef} from '@angular/material';

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
  constructor(private authService: AuthService,
    public thisDialogRef: MatDialogRef<RegisterComponent>, @Inject(MAT_DIALOG_DATA) public data: string) { }

  ngOnInit() {

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

  onCloseConfirm() {
    console.log(this.user);
    this.authService.registerUser(this.user).subscribe(data => {
      // Resposne from registration attempt
      if (!data.success) {
        console.log(data);
        this.messageClass = 'alert alert-danger'; // Set an error class
        this.message = 'Sorry, ' + data.message; // Set an error message

      } else {
        console.log('Saved');
        this.thisDialogRef.close();
      }
    });

  }

  onCloseCancel() {
    this.thisDialogRef.close();
  }


}
