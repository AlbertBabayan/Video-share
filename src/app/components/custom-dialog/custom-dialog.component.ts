import {Component, inject} from '@angular/core';
import {DIALOG_DATA, DialogRef} from '@angular/cdk/dialog';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {IElement} from '../../infrastructure/interfaces/element.interface';

@Component({
  selector: 'app-custom-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './custom-dialog.component.html',
  styleUrl: './custom-dialog.component.scss'
})

export class CustomDialogComponent {

  private dialogRef = inject<DialogRef<IElement>>(DialogRef);
  public data = inject<IElement>(DIALOG_DATA);
  private formBuilder = inject(FormBuilder);
  public elementForm = this.formBuilder.nonNullable.group({
    id: [this.data.id, Validators.required],
    name: ['', Validators.required],
    username: ['', Validators.required],
  })

  public save() {
    const name = this.elementForm.get('name')?.value ? this.elementForm.get('name')?.value!: this.data.name;
    const username = this.elementForm.get('username')?.value ? this.elementForm.get('username')?.value!: this.data.username;
    this.dialogRef.close({
      id: this.elementForm.get('id')?.value!,
      name: name,
      username: username,
    });
    console.log(this.elementForm.get('username')?.value)
  }

  public cancel() {
    this.dialogRef.close();
  }
}
