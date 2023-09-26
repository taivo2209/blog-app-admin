import { Injectable } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  authState,
  User,
  signOut,
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, EMPTY, Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userDisposable: Subscription | undefined;
  user: Observable<User | null> = EMPTY;
  loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoggedInGuard: boolean = false;

  constructor(
    private auth: Auth,
    private toastr: ToastrService,
    private router: Router
  ) {}

  login(email: string, password: string) {
    signInWithEmailAndPassword(this.auth, email, password)
      .then((logRef) => {
        this.toastr.success('Logged In Successfully');
        this.loadUser();
        this.loggedIn.next(true);
        this.isLoggedInGuard = true;
        this.router.navigate(['/']);
      })
      .catch((err) => {
        this.toastr.warning(err);
        console.log(err);
      });
  }

  loadUser() {
    if (this.auth) {
      this.user = authState(this.auth);
      this.userDisposable = authState(this.auth).subscribe((user) => {
        localStorage.setItem('user', JSON.stringify(user));
      });
    }
  }

  logOut() {
    signOut(this.auth).then(() => {
      this.toastr.success('Logged out!!');
      localStorage.removeItem('user');
      this.loggedIn.next(false);
      this.isLoggedInGuard = false;
      this.router.navigate(['/login']);
    });
  }

  isLoggedIn() {
    return this.loggedIn.asObservable();
  }
}
