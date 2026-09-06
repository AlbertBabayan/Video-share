import {Component, inject} from '@angular/core';
import {DIALOG_DATA, DialogRef} from '@angular/cdk/dialog';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {IElementItem} from '../../infrastructure/interfaces/element-item.interface';
import {MatCheckbox} from '@angular/material/checkbox';
import {IItemLog} from '../../infrastructure/interfaces/itemLog.interface';

@Component({
  selector: 'app-custom-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCheckbox
  ],
  templateUrl: './custom-dialog.component.html',
  styleUrl: './custom-dialog.component.scss'
})

export class CustomDialogComponent {

  private dialogRef = inject<DialogRef<IElementItem>>(DialogRef);
  public element = inject<IElementItem>(DIALOG_DATA);
  private formBuilder = inject(FormBuilder);
  public elementForm = this.formBuilder.nonNullable.group({
    data: this.formBuilder.nonNullable.group({
      name: [''],
      username: [''],
    }),
  });

  public save() {
    const data = this.elementForm.controls.data.getRawValue();
    this.dialogRef.close({
      data: {
        ...this.element.data,
        ...data,
      },
    });
  }

  public cancel() {
    this.dialogRef.close();
  }
}
