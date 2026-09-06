import {Component, computed, DestroyRef, effect, inject, signal} from '@angular/core';
import {RecordDataService} from '../../services/record-data.service';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {IElement} from '../../infrastructure/interfaces/element.interface';
import {MatCheckbox} from '@angular/material/checkbox';
import {DatePipe} from '@angular/common';
import {CustomDialogComponent} from '../custom-dialog/custom-dialog.component';
import {Dialog} from '@angular/cdk/dialog';

@Component({
    selector: 'app-manage',
    templateUrl: './manage.component.html',
    imports: [
        MatCheckbox,
        DatePipe
    ],
    styleUrl: './manage.component.scss'
})
export class ManageComponent {

  private recordDataService = inject(RecordDataService);
  private destroyRef = inject(DestroyRef);
  private dialog = inject(Dialog);
  private searchTerm = signal('')
  public elements = signal<IElement[]>([])
  public allChecked = computed(() =>
    this.elements().length &&
    this.elements().every(item => item.completed)
  );
  public someChecked = computed(() =>
    this.elements().some(item => item.completed) &&
    !this.allChecked()
  );

  public filteredElements = computed(() => {
    return this.elements().filter(item => {
      return item.name.toLowerCase().includes(this.searchTerm().toLowerCase());
    })
  });

  constructor() {
    effect(() => {
      this.recordDataService.getElements().pipe(
        takeUntilDestroyed(this.destroyRef)
      ).subscribe(res => {
        this.elements.set(res);
      })
    }, {
      allowSignalWrites: true
    })
  }

  public toggleAll(checked: boolean) {
    this.elements.update(elements =>
      elements.map(item => ({
        ...item,
        completed: checked
      }))
    );
  }

  public update(id: number, checked: boolean) {
    this.elements.update(elements =>
      elements.map(item =>
        item.id === id
          ? {...item, completed: checked}
          : item
      )
    );
  }

  public search(searchTerm: string) {
    this.searchTerm.set(searchTerm);
  }

  public removeItem(id: number) {
    this.elements.update(elements =>
      elements.filter(item => item.id !== id)
    );
    this.recordDataService.removeElement(id);
  }

  public editItem(element: IElement) {
    const dialogRef = this.dialog.open<
      IElement
    >(CustomDialogComponent, {
      minWidth: '300px',
      data: element,
    });
    dialogRef.closed.subscribe(res => {
      if (res) {
        this.elements.update(elements =>
          elements.map(element =>
            element.id === res.id ? res : element
          )
        );
      }
    });
  }
}
