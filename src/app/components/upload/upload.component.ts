import {Component, DestroyRef, inject, signal} from '@angular/core';
import {VideoDataService} from '../../services/video-data.service';
import {VideosComponent} from '../videos/videos.component';
import {IElement} from '../../infrastructure/interfaces/element.interface';
import {elements} from '../../mock/generated-elements';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [
    VideosComponent
  ],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.scss'
})
export class UploadComponent {

  private dataTransferSvc = inject(VideoDataService);
  private destroyRef = inject(DestroyRef);
  private vdSvc = inject(VideoDataService);
  public elements = signal<IElement[]>([]);

  public onSelectFile(event: any) {
    const file = event.target.files && event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (reader.result) {
          const lastItem = elements[elements.length - 1];
          const newId = lastItem?.id !== undefined ? lastItem.id + 1 : 1;
          const newItem = {
            id: newId,
            name: `${file.name}`,
            username: newId,
            video: reader.result,
          };
          this.vdSvc.updateElements(newItem);
          this.getElements();
          this.dataTransferSvc.changeData(this.elements());
        }
      }
    }
  }

  public getElements() {
    this.vdSvc.getElements().pipe(
      takeUntilDestroyed(this.destroyRef),
    ).subscribe(res => {
      this.elements.set(res);
    })
  }

}
