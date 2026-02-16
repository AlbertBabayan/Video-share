import {Component, ElementRef, inject, signal, ViewChild} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {VideoDataService} from '../../services/video-data.service';
import {MatButtonModule} from '@angular/material/button';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ReactiveFormsModule, MatButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  private router = inject(Router);

  public navigateToManage(): void {
    this.router.navigate(['manage']);
  }

  public navigateToUpload() {
    this.router.navigate(['upload']);
  }
}
