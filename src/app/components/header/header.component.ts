import {Component, inject, OnInit} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ReactiveFormsModule, MatButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  private router = inject(Router);
  private navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;

  ngOnInit() {
    if (this.navigation?.type === 'reload') {
      this.router.navigate(['/main']);
    }
  }

  public navigateToManage() {
    this.router.navigate(['manage']);
  }

  public navigateToUpload() {
    this.router.navigate(['upload']);
  }
}
