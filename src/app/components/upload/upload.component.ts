import {Component, DestroyRef, ElementRef, inject, OnInit, signal, ViewChild} from '@angular/core';
import {VideoDataService} from '../../services/video-data.service';
import {VideosComponent} from '../videos/videos.component';
import {IElement} from '../../infrastructure/interfaces/element.interface';
import {elements} from '../../Mock/elementValue';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {of} from 'rxjs';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [
    VideosComponent
  ],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.scss'
})
export class UploadComponent implements OnInit{

  public videos = signal<IElement[]>([]);
  private dataTransferSvc = inject(VideoDataService);
  public elements = signal<IElement[] | null>(null)
  private destroyRef = inject(DestroyRef);
  private vdSvc = inject(VideoDataService);

  ngOnInit(): void {
    this.getElement();
  }

  public getElement() {
    this.vdSvc.get().pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(() => of(this.elements()))
    this.elements.set(elements)
  }

  public onSelectFile(event: any) {
    const file = event.target.files && event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (reader.result) {
          this.videos.update(() => {
            return this.elements()!.map(item => {
              return {
                position: item.id,
                weight: item.verId,
                name: item.name,
                value: reader.result,
              }
            });
          });
          this.dataTransferSvc.changeData(this.videos());
        }
      }
      // reader.readAsDataURL(file);
    }
  }
}
