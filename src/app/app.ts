import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // <-- ADICIONE CommonModule
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true, // <-- ISSO É CRUCIAL!
  imports: [
    CommonModule, // <-- ADICIONE CommonModule (Boa prática para componentes raiz, caso você use *ngIf, *ngFor ou pipes no template principal)
    RouterOutlet
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'loja-sofas-frontend';
}