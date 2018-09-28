import { Component, OnInit, Inject } from '@angular/core';
import { RegisterModel } from '../../models/registerModel';
import { AuthService } from '../../services/auth.service';
import {MAT_DIALOG_DATA} from '@angular/material';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;
  user: RegisterModel = new RegisterModel();
  message = '';
  messageClass = '';

  constructor(private authService: AuthService,
    public thisDialogRef: MatDialogRef<LoginComponent>, @Inject(MAT_DIALOG_DATA) public data: string) { }

  ngOnInit() {
  }

  onCloseConfirm() {
    console.log(this.user);
    // this.authService.registerUser(this.user).subscribe(data => {
    //   if (!data.success) {
    //     console.log(data);
    //     this.messageClass = 'alert alert-danger'; // Set an error class
    //     this.message = 'Sorry, ' + data.message; // Set an error message

    //   } else {
    //     console.log('Welcome');
    //     this.thisDialogRef.close();
    //   }
    // });

  }

  onCloseCancel() {
    this.thisDialogRef.close();
  }

}
