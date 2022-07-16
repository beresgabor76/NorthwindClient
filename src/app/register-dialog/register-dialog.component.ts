import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { LoginDto } from '../_models/LoginDto';
import { AuthService } from '../_services/auth.service';
import { MessageService } from '../_services/message.service';

@Component({
  selector: 'app-register-dialog',
  templateUrl: './register-dialog.component.html',
  styleUrls: ['./register-dialog.component.css']
})
export class RegisterDialogComponent implements OnInit, OnDestroy {
  loginSub: Subscription = this.authService.loginSubject.subscribe(
    tokenDto => { if (tokenDto.token) { this.dialogRef.close() } });

  constructor(public dialogRef: MatDialogRef<RegisterDialogComponent>, private authService: AuthService,
              private messageService: MessageService) { }
    
  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.loginSub.unsubscribe();
  }

  onSubmit(data: any) {
    if (data.password === data.confirmPassword) {
      this.authService.register(data.username, data.password);
    }
    else {
      this.messageService.showError("Password fields do not match.");
    }
  }
}
