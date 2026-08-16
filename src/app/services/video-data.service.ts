import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {IElement} from '../infrastructure/interfaces/element.interface';
import {elements} from '../mock/generated-elements';

@Injectable({
  providedIn: 'root'
})
export class VideoDataService {
  private dataSource = new BehaviorSubject<IElement[]>([]);
  public currentData = this.dataSource.asObservable();

  public changeData(data: IElement[]) {
    this.dataSource.next(data);
  }

  public updateElements(newItem: IElement) {
    elements.push(newItem);
  }

  public getElements(): Observable<IElement[]> {
    return of(elements)
  }
}
