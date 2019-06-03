import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/shared/services/auth.service';
import { Router } from '@angular/router';
import { User } from 'app/shared/services/interfaces';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-notes-layout',
  templateUrl: './notes-layout.component.html',
  styleUrls: ['./notes-layout.component.css']
})

export class NotesLayoutComponent implements OnInit  {
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  user: User;

  constructor(private breakpointObserver: BreakpointObserver,
              private auth: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.auth.profile().subscribe();
    this.user = this.auth.getUserProfile();
  }

  openProfile(event: Event) {
    event.preventDefault();
    this.auth.profile().subscribe();
    this.user = this.auth.getUserDetails();
// tslint:disable-next-line: no-unused-expression
    this.router.navigate['/profile'];
  }

  logOut(event: Event) {
    event.preventDefault();
    this.auth.logOut();
// tslint:disable-next-line: no-unused-expression
    this.router.navigate['/login'];
  }

}
