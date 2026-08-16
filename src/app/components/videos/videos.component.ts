import {Component, inject, OnInit, signal} from '@angular/core';
import {VideoDataService} from '../../services/video-data.service';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {MatIconModule} from '@angular/material/icon';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {IElement} from '../../infrastructure/interfaces/element.interface';
import {OverlayModule} from '@angular/cdk/overlay';
import {ElementComponent} from '../element/element.component';


@Component({
  selector: 'app-videos',
  standalone: true,
  imports: [
    DragDropModule,
    MatIconModule,
    OverlayModule,
    ElementComponent,
  ],
  templateUrl: './videos.component.html',
  styleUrl: './videos.component.scss'
})
export class VideosComponent implements OnInit {

  private dataTransferService = inject(VideoDataService);
  public elements = signal<IElement[]>([]);
  public items = signal<IElement[]>([]);


  ngOnInit(): void {
    this.dataTransferService.currentData.subscribe(data => {
      this.elements.set(data);
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
