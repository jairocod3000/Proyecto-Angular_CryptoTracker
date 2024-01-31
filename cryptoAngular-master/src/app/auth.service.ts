import { Injectable } from '@angular/core';
import { Auth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, GithubAuthProvider} from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  public isLogged:boolean = false;
  public userID:string = '';
  public userEmail:any = '';
  public userPhoto:any = '';
  constructor(public auth:Auth, public router:Router) { }

  checkAuthState(){
    onAuthStateChanged(this.auth, (user) => {
      if(user){
        this.isLogged = true;
        this.userEmail = user.email
        this.userID = user.uid;
        this.userPhoto = user.photoURL;
      }else{
        this.isLogged = false;
        this.userID = '';
      }
    })
  }

  register(email: string, password: string){
    createUserWithEmailAndPassword(this.auth, email, password)
    .then((userCredential) => {
      this.isLogged = true;
      this.userID = userCredential.user.uid;
      this.userEmail = userCredential.user.email
      this.router.navigate(['/']);
    })
    .catch((error) => {
      this.isLogged = false;
      this.userID = '';
    });
  }

  normalLogin(email: string, password: string){
    signInWithEmailAndPassword(this.auth, email, password)
    .then((userCredential) => {
      this.isLogged = true;
      this.userID = userCredential.user.uid;
      this.userEmail = userCredential.user.email
      this.router.navigate(['/']);
    })
    .catch((error) => {
      this.isLogged = false;
      this.userID = '';
    });
  }

  googleLogin(){
    signInWithPopup(this.auth, new GoogleAuthProvider())
    .then((userCredential) => {
      this.isLogged = true;
      this.userID = userCredential.user.uid;
      this.userEmail = userCredential.user.email
      this.userPhoto = userCredential.user.photoURL;
      this.router.navigate(['/']);
    })
    .catch((error) => {
      this.isLogged = false;
      this.userID = '';
    });
  }

  githubLogin(){
    signInWithPopup(this.auth, new GithubAuthProvider())
    .then((userCredential) => {
      this.isLogged = true;
      this.userID = userCredential.user.uid;
      this.userEmail = userCredential.user.email
      this.userPhoto = userCredential.user.photoURL;
      this.router.navigate(['/']);
    })
    .catch((error) => {
      this.isLogged = false;
      this.userID = '';
    });
  }

  signOut(){
    this.auth.signOut();
    this.isLogged = false;
    this.userID = '';
    this.router.navigate(['/']);
  }

  isAuthentificated(){
    return this.isLogged;
  }
}
