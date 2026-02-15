import { Component } from '@angular/core';
import {HeaderComponent} from './components/header/header.component';
import {MainComponent} from './components/main/main.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, MainComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'videoShare';
}
