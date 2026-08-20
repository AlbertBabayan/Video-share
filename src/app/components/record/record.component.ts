import {Component, inject, OnInit, signal} from '@angular/core';
import {RecordDataService} from '../../services/record-data.service';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {MatIconModule} from '@angular/material/icon';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {IElement} from '../../infrastructure/interfaces/element.interface';
import {OverlayModule} from '@angular/cdk/overlay';
import {FormBuilder, Validators} from '@angular/forms';
import {Dialog} from '@angular/cdk/dialog';
import {CustomDialogComponent} from '../custom-dialog/custom-dialog.component';
import {MatButton} from '@angular/material/button';


@Component({
  selector: 'app-record',
  standalone: true,
  imports: [
    DragDropModule,
    MatIconModule,
    OverlayModule,
    MatButton
  ],
  templateUrl: './record.component.html',
  styleUrl: './record.component.scss'
})
export class RecordComponent implements OnInit {

  private dataTransferService = inject(RecordDataService);
  public elements = signal<IElement[]>([]);
  public items = signal<IElement[]>([]);
  private formBuilder = inject(FormBuilder);
  public elementForm = this.formBuilder.nonNullable.group({
    id: ['', [Validators.required]],
    name: ['', [Validators.required]],
    username: ['', [Validators.required]]
  });
  private dialog = inject(Dialog);

  ngOnInit(): void {
    this.dataTransferService.currentData.subscribe(data => {
      this.elements.set(data);
    });
  }

  public edit(element: IElement) {
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
            element.id === res.id
              ? {...res, record: element.record}
              : element
          )
        );
        this.items.update(items =>
          items.map(item =>
            item.id === res.id
              ? {...res, record: item.record}
              : item
          )
        );
      }
    });
  }

  public dropItem(event: CdkDragDrop<IElement[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}
