import { ElementRef, Injectable } from '@angular/core';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, getIdToken } from "firebase/auth";
import { getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyAoze0qpSoNaUeJVkSpvJhYwyFwquBQ600",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "registrationfirstproject",
  appId: "1:1013234653526:android:7c49d0514315ee3e985ef7"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

@Injectable({
  providedIn: 'root'
})
export class UserAuthenticationService {
  async registerUser(email: string, password: string, inputEmailRef: ElementRef, inputPasswordRef: ElementRef, inputRepeatPasswordRef: ElementRef) {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert('SignUp');
    } catch (error: any) {
      if (error.code) {

        switch (error.code) {
          case 'auth/email-already-in-use':
            inputPasswordRef.nativeElement.style.border = '0px';
            inputRepeatPasswordRef.nativeElement.style.border = '0px';
            inputEmailRef.nativeElement.style.border = '1px solid red';
            alert('Этот электронный адрес уже используется.');
            break;
          case 'auth/weak-password':
            inputEmailRef.nativeElement.style.border = '0px';
            inputPasswordRef.nativeElement.style.border = '1px solid red';
            inputRepeatPasswordRef.nativeElement.style.border = '1px solid red';
            alert('Пароль должен быть не менее 6 символов.');
            break;
          case 'auth/invalid-email':
            inputPasswordRef.nativeElement.style.border = '0px';
            inputRepeatPasswordRef.nativeElement.style.border = '0px';
            inputEmailRef.nativeElement.style.border = '1px solid red';
            alert('Неверный формат электронного адреса.');
            break;
          default:
            alert('Произошла неизвестная ошибка при регистрации.');
        }
      } else {
        alert('Произошла неизвестная ошибка');
      }
    }
  }
  async loginUser(email: string, password: string, inputEmailRef: ElementRef, inputPasswordRef: ElementRef) {
    try {
      const users = await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem('authToken', await getIdToken(users.user));
      alert('logIn');
    } catch (error: any) {
      if (error.code) {
        switch (error.code) {
          case 'auth/invalid-credential':
            inputEmailRef.nativeElement.style.border = '1px solid red';
            inputPasswordRef.nativeElement.style.border = '1px solid red';
            alert('Неверный пароль или email.');
            break;
          case 'auth/invalid-email':
            inputPasswordRef.nativeElement.style.border = '0px';
            inputEmailRef.nativeElement.style.border = '1px solid red';
            alert('Неверный формат электронного адреса.');
            break;
          default:
            alert('Произошла неизвестная ошибка при входе в систему.');
        }
      } else {
        alert('Произошла неизвестная ошибка');
      }
    }
  }
}
