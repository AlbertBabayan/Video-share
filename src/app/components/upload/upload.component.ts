import {Component, inject, signal} from '@angular/core';
import {RecordDataService} from '../../services/record-data.service';
import {RecordComponent} from '../record/record.component';
import {IElement} from '../../infrastructure/interfaces/element.interface';
import {elements} from '../../mock/generated-elements';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [
    RecordComponent
  ],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.scss'
})
export class UploadComponent {

  private dataTransferService = inject(RecordDataService);
  private recordService = inject(RecordDataService);
  public elements = signal<IElement[]>([]);

  public onFileSelect(event: any) {
    const file = event.target.files && event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (reader.result) {
          const lastItem = elements[elements.length - 1];
          const newId = lastItem ? lastItem.id + 1 : 1;
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
          this.dataTransferService.changeData(this.elements());
        }
      }
    }
  }
}
