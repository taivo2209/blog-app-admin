import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  userEmail: any;
  isLoggedIn$: Observable<boolean> | undefined;

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    const userJson = localStorage.getItem('user');
    
    if (userJson) {
      const user = JSON.parse(userJson);
      this.userEmail = user.email;
    } else {
      
      this.userEmail = null; 
    }

    this.isLoggedIn$ = this.auth.isLoggedIn();
  }

  onLogOut(){
    this.auth.logOut();
  }
}
