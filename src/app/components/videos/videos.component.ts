import {
  Component,
  computed,
  ContentChild,
  ElementRef,
  inject,
  OnInit,
  signal,
  TemplateRef,
  ViewChild
} from '@angular/core';
import {VideoDataService} from '../../services/video-data.service';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {MatIconModule} from '@angular/material/icon';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {elements} from '../../Mock/elementValue';
import {IElement} from '../../infrastructure/interfaces/element.interface';
import {CdkConnectedOverlay, CdkOverlayOrigin, OverlayModule} from '@angular/cdk/overlay';
import { Overlay } from '@angular/cdk/overlay';


@Component({
  selector: 'app-videos',
  standalone: true,
  imports: [
    DragDropModule,
    MatIconModule,
    OverlayModule,
    CdkOverlayOrigin,
    CdkConnectedOverlay,
  ],
  templateUrl: './videos.component.html',
  styleUrl: './videos.component.scss'
})
export class VideosComponent implements OnInit {

  // @ViewChild('myModal') modal: ElementRef;
  @ContentChild('content') content: TemplateRef<any>;
  private dataTransferService = inject(VideoDataService);
  private overlay  = inject(Overlay);
  public all = computed(() => elements.concat(this.receivedData()));
  public receivedData = signal<IElement[]>([]);
  public isOpen = signal(false);
  public elements = signal<IElement[]>(this.receivedData());


  ngOnInit(): void {
    this.dataTransferService.currentData.subscribe(data => {
      this.receivedData.set(data);
    });
  }

private getLocation() {
  this.overlay.position()
    .global()
    .centerHorizontally()
    .centerVertically();
  const overlayRef = this.overlay.create();
  overlayRef.backdropClick().subscribe(() => {
    overlayRef.dispose();
  });
}

  public edit() {
    this.isOpen.set(!this.isOpen());
    this.getLocation();
  }

  // public close() {
  //   this.modal.nativeElement.style.display = 'none';
  // }

  public currentItem(event: CdkDragDrop<IElement[]>) {
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
  public sendALl(){
    return this.all();
  }
}
