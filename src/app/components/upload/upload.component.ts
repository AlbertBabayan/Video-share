import {Component, computed, inject, signal} from '@angular/core';
import {RecordDataService} from '../../services/record-data.service';
import {IElement} from '../../infrastructure/interfaces/element.interface';
import {elements} from '../../mock/generated-elements';
import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
  transferArrayItem
} from '@angular/cdk/drag-drop';
import {MatButton} from '@angular/material/button';
import {CustomDialogComponent} from '../custom-dialog/custom-dialog.component';
import {Dialog} from '@angular/cdk/dialog';

@Component({
    selector: 'app-upload',
    imports: [
        DragDropModule,
        MatButton
    ],
    templateUrl: './upload.component.html',
    styleUrl: './upload.component.scss'
})
export class UploadComponent {

  private recordService = inject(RecordDataService);
  private dialog = inject(Dialog);
  public elements = signal<IElement[]>([]);
  public items = signal<IElement[]>([]);
  public allUploads = computed(() => [...this.items(), ...this.elements()]);
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

  public itemDetails(element: IElement) {
    const dialogRef = this.dialog.open<
      (IElement)
    >(CustomDialogComponent, {
      minWidth: '300px',
      data: element,
    });
    dialogRef.closed.subscribe(res => {
      if (!res) {
        return;
      }
      this.elements.update(elements =>
        elements.map(item =>
          item.id === res.id ? res : item
        )
      );
      this.items.update(items =>
        items.map(item =>
          item.id === res.id ? res : item
        )
      );
    });
  }

  public onFileSelect(event: Event) {
    const eventTarget = event.target as HTMLInputElement;
    const file = eventTarget.files?.[0];
    if (!file) {
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (!reader.result) {
        return;
      }
      const video = document.createElement('video');
      video.preload = 'metadata';
      video.onloadedmetadata = () => {
        const minutes = Math.floor(video.duration / 60);
        const seconds = Math.floor(video.duration % 60);
        const duration = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        const lastItem = elements[elements.length - 1];
        const createdId = lastItem ? lastItem.id + 1 : 1;

        const newItem = {
          id: createdId,
          name: file.name,
          username: file.name.replace(/\.[^.]*$/, ''),
          duration: duration,
          size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
          lastModifiedDate : new Date(file.lastModified),
          record: reader.result,
          completed: false,
        };
        this.recordService.updateElements(newItem);
        this.elements.update(elements => [
          ...elements,
          newItem
        ]);
        URL.revokeObjectURL(video.src);
      };
      video.src = URL.createObjectURL(file);
    };
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
