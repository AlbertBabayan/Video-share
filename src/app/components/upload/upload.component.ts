import {Component, inject, signal} from '@angular/core';
import {RecordDataService} from '../../services/record-data.service';
import {IElement} from '../../infrastructure/interfaces/element.interface';
import {elements} from '../../mock/generated-elements';
import {Dialog} from '@angular/cdk/dialog';
import {CustomDialogComponent} from '../custom-dialog/custom-dialog.component';
import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
  transferArrayItem
} from '@angular/cdk/drag-drop';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [
    DragDropModule,
    MatButton
  ],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.scss'
})
export class UploadComponent {

  private recordService = inject(RecordDataService);
  public elements = signal<IElement[]>([]);
  public items = signal<IElement[]>([]);
  private dialog = inject(Dialog);
  public canShowUploads = signal<boolean>(false);


  public openUpload(input: HTMLInputElement) {
    this.canShowUploads.set(false);
    input.click();
  }

  public uploadVideos(event: Event) {
    this.onFileSelect(event);
  }

  public recentUploads() {
    this.canShowUploads.set(true);
  }

  public onFileSelect(event: Event) {
    const eventTarget = event.target as HTMLInputElement;
    const file = eventTarget.files && eventTarget.files[0];
    if (!file) {
      return;
    }
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (reader.result) {
          const lastItem = elements[elements.length - 1];
          const newId = lastItem ? lastItem.id! + 1 : 1;
          const newItem = {
            id: newId,
            name: `${file.name}`,
            username: `${file.name}`,
            record: reader.result,
          };
          this.recordService.updateElements(newItem);
          this.elements.update(() => [
            ...this.elements(),
            newItem
          ]);
        }
      }
    }
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
            element.id === res.id ? res : element
          )
        );
        this.items.update(items =>
          items.map(item =>
            item.id === res.id ? res : item
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
