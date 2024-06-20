import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { UserAuthenticationService } from '../user-authentication.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css'
})
export class LogInComponent {
  @Output() showLogInChange = new EventEmitter<boolean>();
  @Output() showSignUpChange = new EventEmitter<boolean>();

  selectMod() {
    this.showLogInChange.emit(false);
    this.showSignUpChange.emit(true);
  }

  @ViewChild('inputEmail') inputEmailRef!: ElementRef;
  @ViewChild('inputPassword') inputPasswordRef!: ElementRef;

  constructor(private authService: UserAuthenticationService) { }

  logIn() {
    const email = this.inputEmailRef.nativeElement.value;
    const password = this.inputPasswordRef.nativeElement.value;
    this.authService.loginUser(email, password, this.inputEmailRef, this.inputPasswordRef);
  }
}

