import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RegisterDialogComponent } from '../register-dialog/register-dialog.component';
import { TokenDto } from '../_models/TokenDto';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  tokenSub: Subscription = this.authService.loginSubject
    .subscribe(tokenDto => { tokenDto = tokenDto as TokenDto; this.currentToken = tokenDto.token });
  currentToken: string = '';

  constructor(private authService: AuthService, private dialog: MatDialog, private router: Router) { }    

  ngOnInit(): void {    
  }

  ngOnDestroy(): void {
    this.tokenSub.unsubscribe();
  }

  login(data: any) {
    this.authService.login(data.username, data.password);
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/');
  }

  register() {
    this.dialog.open(RegisterDialogComponent);
  }
}
