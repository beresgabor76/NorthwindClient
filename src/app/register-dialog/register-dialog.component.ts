import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, NgForm, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
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

  registerForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(3)]),
    password: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]),
    confirmPassword: new FormControl('', [Validators.required, passwordMatchValidator])
  }, { validators: [passwordMatchValidator] });

  constructor(public dialogRef: MatDialogRef<RegisterDialogComponent>, private authService: AuthService,
              private messageService: MessageService) { }
    
  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.loginSub.unsubscribe();
  }

  onSubmit() {
    if (this.registerForm.controls['username'].valid &&
      this.registerForm.controls['password'].valid &&
      this.registerForm.getError('passwordMatch') == true) {
      this.authService.register(
        this.registerForm.controls['username'].value,
        this.registerForm.controls['password'].value);
    }
    else {
      this.messageService.showError('Please fill in the form properly.');      
    }
  }
  
  public hasError(controlName: string, errorName: string) {
    return this.registerForm.controls[controlName].hasError(errorName);
  }

  public hasPasswordMatchError() {
    if (this.registerForm.getError('noPasswordMatch') == true)  
      return true;    
    else
      return false;
  }
}
/*
export const passwordStrengthValidator: ValidatorFn
  = (control: AbstractControl): ValidationErrors | null => {

    const value = control.value;

    if (!value) {
      return null;
    }

    const hasUpperCase = /[A-Z]+/.test(value);

    const hasLowerCase = /[a-z]+/.test(value);

    const hasNumeric = /[0-9]+/.test(value);

    const passwordValid = hasUpperCase && hasLowerCase && hasNumeric;

    return !passwordValid ? { passwordStrength: true } : { passwordStrength: false };
  };
  */

export const passwordMatchValidator: ValidatorFn
  = (control: AbstractControl): ValidationErrors | null => {
    
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    return (password?.value != confirmPassword?.value) ? { noPasswordMatch: true } : { passwordMatch: true };
  };
  

