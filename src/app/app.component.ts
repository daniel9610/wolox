import { Component } from '@angular/core';
import { HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent {
  // title = 'WoloxTest';
  constructor(
    public router : Router,
  ) { }

  @HostListener('window:scroll', ['$event'])

onWindowScroll() {
    const element = document.querySelector('.navbar') as HTMLElement;
    if (window.pageYOffset > element.clientHeight) {
      element.classList.add('navbar-inverse');
    } else {
      element.classList.remove('navbar-inverse');
    }
  }

  goToLogin(){
    this.router.navigateByUrl('/login');
  }
}