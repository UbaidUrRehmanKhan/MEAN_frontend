import { Component, OnInit, Inject } from '@angular/core';
import { LoginModel } from '../../models/loginModel';
import { AuthService } from '../../services/auth.service';
import {MAT_DIALOG_DATA} from '@angular/material';
import {MatDialogRef} from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;
  user: LoginModel = new LoginModel();
  message = '';
  messageClass = '';

  constructor(private authService: AuthService, public router: Router,
    public thisDialogRef: MatDialogRef<LoginComponent>, @Inject(MAT_DIALOG_DATA) public data: string) { }

  ngOnInit() {
  }

  onCloseConfirm() {
    this.authService.login(this.user).subscribe(data => {
      if  (data === false) {
        this.user = new LoginModel();
        this.messageClass = 'alert alert-danger'; // Set an error class
        this.message = 'Sorry, Invalid username/password'; // Set an error message

      } else {
        this.router.navigate(['/dashboard']);
        this.thisDialogRef.close();
      }
    });

  }

  onCloseCancel() {
    this.thisDialogRef.close();
  }

}
