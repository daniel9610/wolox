import { Component } from '@angular/core';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent {
  // title = 'WoloxTest';

  @HostListener('window:scroll', ['$event'])

onWindowScroll() {
    const element = document.querySelector('.navbar') as HTMLElement;
    if (window.pageYOffset > element.clientHeight) {
      element.classList.add('navbar-inverse');
      console.log("inverse");
    } else {
      element.classList.remove('navbar-inverse');
      console.log("normal");
    }
  }
}