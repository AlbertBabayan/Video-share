import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {IElement} from '../infrastructure/interfaces/element.interface';
import {elements} from '../mock/generated-elements';

@Injectable({
  providedIn: 'root'
})
export class RecordDataService {

  public updateElements(newItem: IElement) {
    elements.push(newItem);
  }

  public getElements(): Observable<IElement[]> {
    return of(elements);
  }

    public removeElement(id: number) {
    elements.splice(elements.findIndex(item => item.id === id), 1);
  }
}
