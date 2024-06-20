import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { UserAuthenticationService } from '../user-authentication.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  @Output() showLogInChange = new EventEmitter<boolean>();
  @Output() showSignUpChange = new EventEmitter<boolean>();

  selectMod() {
    this.showLogInChange.emit(true);
    this.showSignUpChange.emit(false);
  }

  @ViewChild('inputEmail') inputEmailRef!: ElementRef;
  @ViewChild('inputPassword') inputPasswordRef!: ElementRef;
  @ViewChild('inputRepeatPassword') inputRepeatPasswordRef!: ElementRef;

  constructor(private authService: UserAuthenticationService) { }

  signUp() {
    const email = this.inputEmailRef.nativeElement.value;
    const password = this.inputPasswordRef.nativeElement.value;
    const passwordRepeat = this.inputRepeatPasswordRef.nativeElement.value;
    if (password === passwordRepeat) {
      this.authService.registerUser(email, password, this.inputEmailRef, this.inputPasswordRef, this.inputRepeatPasswordRef);
      this.inputRepeatPasswordRef.nativeElement.style.border = '0px';
    }
    else {
      this.inputEmailRef.nativeElement.style.border = '0px';
      this.inputPasswordRef.nativeElement.style.border = '0px';
      this.inputRepeatPasswordRef.nativeElement.style.border = '1px solid red';
      alert('Пароли не совпадают.');
    }
  }
}
