import { Injectable } from '@angular/core';
import {BehaviorSubject, of} from 'rxjs';
import {IElement} from '../infrastructure/interfaces/element.interface';

@Injectable({
  providedIn: 'root'
})
export class VideoDataService {
  private dataSource = new BehaviorSubject<IElement[]>([]);
  public currentData = this.dataSource.asObservable();

  public changeData(data: IElement[]) {
    this.dataSource.next(data);
  }

  public get() {
    return of(true);
  }
}
