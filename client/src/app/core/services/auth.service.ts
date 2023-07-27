import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestoreDocument,
  AngularFirestore,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any;

  constructor(
    private fireAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {
    this.fireAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null ? true : false;
  }

  //Login
  login(email: string, password: string) {
    return this.fireAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.setUserData(result.user);
        this.fireAuth.authState.subscribe((user) => {
          if (user) {
            this.router.navigate(['/user/profile']);
          }
        });
      })
      .catch((err) => {
        window.alert(err.message);
      });
  }

  //Register
  register(email: string, password: string) {
    return this.fireAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.sendVerificationMail();
        this.setUserData(result.user);
      })
      .catch((err) => {
        window.alert(err.message);
      });
  }

  //Logout
  logout() {
    return this.fireAuth.signOut().then(
      () => {
        localStorage.removeItem('user');
        this.router.navigate(['/user/login']);
      },
      (err) => {
        window.alert(err.message);
      }
    );
  }

  sendVerificationMail() {
    return this.fireAuth.currentUser
      .then((u: any) => u.sendEmailVerification())
      .then(() => {
        this.router.navigate(['/user/verify-email']);
      });
  }

  updateDisplayName(displayName: string) {
    return this.fireAuth.currentUser.then((user) => {
      user
        ?.updateProfile({
          displayName,
        })
        .then(() => {
          this.setUserData(user);
        })
        .catch((err) => {
          window.alert(err.message);
        });
    });
  }

  updatePhotoUrl(photoURL: string) {
    return this.fireAuth.currentUser.then((user) => {
      user
        ?.updateProfile({
          photoURL,
        })
        .then(() => {
          this.setUserData(user);
        })
        .catch((err) => {
          window.alert(err.message);
        });
    });
  }

  setUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
    };
    return userRef.set(userData, { merge: true });
  }
}
