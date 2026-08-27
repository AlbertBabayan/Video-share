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
  public element = inject<IElement>(DIALOG_DATA);
  private formBuilder = inject(FormBuilder);
  public elementForm = this.formBuilder.nonNullable.group({
    id: [this.element.id, Validators.required],
    name: ['', Validators.required],
    username: ['', Validators.required],
  })

  public save() {
    const name = this.elementForm.get('name')?.value ? this.elementForm.get('name')?.value!: this.element.name;
    const username = this.elementForm.get('username')?.value ? this.elementForm.get('username')?.value!: this.element.username;
    this.dialogRef.close({
      id: this.elementForm.get('id')?.value!,
      name: name,
      username: username,
    });
  }

  public cancel() {
    this.dialogRef.close();
  }
}
