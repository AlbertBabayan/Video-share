import {Component, inject, input, signal, ViewChild} from '@angular/core';
import {IElement} from '../../infrastructure/interfaces/element.interface';
import {SharedModalComponent} from '../shared-modal/shared-modal.component';
import {JsonPipe} from '@angular/common';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatMenu, MatMenuModule, MatMenuTrigger} from '@angular/material/menu';

@Component({
  selector: 'app-element',
  standalone: true,
  imports: [
    SharedModalComponent,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatInput
  ],
  templateUrl: './element.component.html',
  styleUrl: './element.component.scss'
})
export class ElementComponent {

  @ViewChild('SharedModalComponent') modal!: SharedModalComponent;
  public item = input<IElement>();
  public canEdit = signal(false)
  private formBuilder = inject(FormBuilder);
  public elementForm = this.formBuilder.nonNullable.group({
    name: ['', [Validators.required]],
    username: ['', [Validators.required]],
    id: ['', [Validators.required]]
  });

  public openModal() {
    this.modal.triggerModal();
  }

  public editFields() {
    this.canEdit.set(!this.canEdit());
  }
}
