import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  @ViewChild('hamburger') public mobileNav!: ElementRef;
  @ViewChild('menubar') public navbar!: ElementRef;

  public toggleNav() {
    this.navbar.nativeElement.classList.toggle('active');
    this.mobileNav.nativeElement.classList.toggle('hamburger-active');
  }
}
