import { Component, OnInit, Input, ContentChild, ElementRef, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-change-status',
  templateUrl: './change-status.component.html',
  styleUrls: ['./change-status.component.css']
})
export class ChangeStatusComponent implements OnInit {
  /**
   * @param status any
   */
  @Input('status') status: any;

  /**
   * @param onChanged EventEmitter<string>
   */
  @Output() onChanged: EventEmitter<string> = new EventEmitter<string>();

  /**
   * @param button ElementRef
   */
  @ContentChild('button') button: ElementRef;

  /**
   * @param changed boolean
   */
  changed = false;

  /**
   * @param newStatus string
   */
  newStatus = '';

  /**
   * @inheritdoc
   */
  ngOnInit() {
  }

  /**
   * Change select value.
   * @param newStatus any
   */
  changeStatus(newStatus: any) {
    if (this.status !== newStatus) {
      this.changed = true;
      this.newStatus = newStatus;
    }
  }

  /**
   * Change status.
   */
  change() {
    this.onChanged.emit(this.newStatus);
  }

}
