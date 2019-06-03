import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/shared/services/auth.service';
import { Router } from '@angular/router';
import { User } from 'app/shared/services/interfaces';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.css']
})

export class AuthLayoutComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  user: User;

  constructor(private breakpointObserver: BreakpointObserver,
    private auth: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.auth.isAuthenticated();
  }

  logOut(event: Event) {
    event.preventDefault();
    this.auth.logOut();
    // tslint:disable-next-line: no-unused-expression
    this.router.navigate['/login'];
  }

}
