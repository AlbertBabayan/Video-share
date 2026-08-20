import {Routes} from '@angular/router';
import {UploadComponent} from './components/upload/upload.component';
import {MainComponent} from './components/main/main.component';

export const routes: Routes = [
  {path: '', redirectTo: 'main', pathMatch: 'full'},
  {path: 'main', component: MainComponent},
  // {path: 'manage', component: ManageComponent},
  {path: 'upload', component: UploadComponent},
];
