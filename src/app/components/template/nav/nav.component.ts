import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  isMenuOpen:boolean = false;
  constructor(){}
  ngOnInit(): void {
  }
  onClickMenu(){
    this.isMenuOpen = !this.isMenuOpen;
    const menuBg = document.getElementById('menu-bg');
    if (menuBg) {
      if (this.isMenuOpen) {
        menuBg.style.opacity = '0.7';
        menuBg.style.visibility = 'visible';
      } else {
         menuBg.style.opacity = '5';
        setTimeout(() => {
          menuBg.style.visibility = 'hidden';
        }, 500);
      }
    }
  }
}
