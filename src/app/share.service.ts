import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {IVideoData} from '../Infrastructure/interfaces/video.interface';

@Injectable({
  providedIn: 'root'
})
export class ShareService {
  private dataSource = new BehaviorSubject<(string | ArrayBuffer)[]>([]);
  public currentData = this.dataSource.asObservable();

  changeData(data: (string | ArrayBuffer)[]) {
    this.dataSource.next(data);
  }
}
