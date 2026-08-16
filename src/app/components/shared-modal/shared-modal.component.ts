import {Component, ContentChild, ElementRef, signal, TemplateRef, ViewChild} from '@angular/core';
import {NgTemplateOutlet} from '@angular/common';

@Component({
  selector: 'app-shared-modal',
  standalone: true,
  imports: [
    NgTemplateOutlet
  ],
  templateUrl: './shared-modal.component.html',
  styleUrl: './shared-modal.component.scss'
})
export class SharedModalComponent {

  @ContentChild('content') content: TemplateRef<any>;

  public showModal = signal(false);

  triggerModal() {
    this.showModal.set(!this.showModal());
  }
}
