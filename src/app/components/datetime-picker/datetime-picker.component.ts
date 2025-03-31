import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SharedModule } from 'src/app/shared.module';

@Component({
  selector: 'app-datetime-picker',
  templateUrl: './datetime-picker.component.html',
  styleUrls: ['./datetime-picker.component.scss'],
  standalone: true,
  imports: [SharedModule],
})
export class DatetimePickerComponent implements OnInit {
  @Input() label: string | undefined;
  @Input() value: string | undefined;
  @Input() disabled: boolean = false;
  @Input() minDate: string | undefined;
  @Output() dateChangeEvent: EventEmitter<string> = new EventEmitter();

  isDatePickerOpen: boolean = false;

  constructor() {}

  ngOnInit() {}

  openDatePicker() {
    if (!this.disabled) {
      this.isDatePickerOpen = true;
    }
  }

  closeDatePicker() {
    this.isDatePickerOpen = false;
    this.dateChangeEvent.emit(this.value);
  }

  dateChanged(event: any) {
    this.value = event.detail.value;
  }
}
