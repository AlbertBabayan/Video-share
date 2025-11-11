import {Component, inject, OnInit} from '@angular/core';
import {ShareService} from '../share.service';
import {IVideoData} from '../../Infrastructure/interfaces/video.interface';
import {SlicePipe} from '@angular/common';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent implements OnInit {

  private dataTransferService = inject(ShareService);
  public receivedData: (string | ArrayBuffer)[] = [];

  ngOnInit(): void {
    this.dataTransferService.currentData.subscribe(data => {
      this.receivedData = data;
    });
  }
}
