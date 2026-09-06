import {Routes} from '@angular/router';
import {UploadComponent} from './components/upload/upload.component';
import {MainComponent} from './components/main/main.component';
import {ManageComponent} from './components/manage/manage.component';

export const routes: Routes = [
  {path: '', redirectTo: 'main', pathMatch: 'full'},
  {path: 'main', component: MainComponent},
  {path: 'upload', component: UploadComponent},
  {path: 'manage', component: ManageComponent},
];
