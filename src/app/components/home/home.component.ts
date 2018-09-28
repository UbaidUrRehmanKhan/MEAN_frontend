import { RegisterComponent } from './../register/register.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public dialog: MatDialog, public dialogLogin: MatDialog) { }
  ngOnInit() {
  }

  openDialog() {
    const dialogRef = this.dialog.open(RegisterComponent, {
      width: '600px',
      data: 'This text is passed into the dialog!'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog closed `);
    });
  }


  openDialogLogin() {
    const dialogRef = this.dialogLogin.open(LoginComponent, {
      width: '600px',
      data: 'This text is passed into the dialog!'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog closed `);
    });
  }
}
