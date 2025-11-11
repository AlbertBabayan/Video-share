import {Component, inject, ViewChild} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {ShareService} from '../share.service';
import {MatButtonModule} from '@angular/material/button';
import {IVideoData} from '../../Infrastructure/interfaces/video.interface';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ReactiveFormsModule, MatButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  public videos: (string | ArrayBuffer)[] = [];
  public format = 'video';
  private dataTransferService = inject(ShareService);

  @ViewChild('myFileInput') myFileInput;

  onSelectFile(event: any) {
    const file = event.target.files && event.target.files[0];
    // const fileName = event.target.files[0].name;
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (reader.result) {
          // const videoData = {
          //   name: fileName,
          //   url: reader.result,
          // }
          this.videos.push(reader.result)
          this.myFileInput.nativeElement.value = '';
          this.sendData();
        }
      }
    }
  }
  sendData() {
    this.dataTransferService.changeData(this.videos);
  }
}
