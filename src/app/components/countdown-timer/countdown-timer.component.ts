import { Component, Input, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { SharedModule } from 'src/app/shared.module';

@Component({
  selector: 'app-countdown-timer',
  templateUrl: './countdown-timer.component.html',
  styleUrls: ['./countdown-timer.component.scss'],
  standalone: true,
  imports: [SharedModule],
})
export class CountdownTimerComponent implements OnInit {
  @Input() targetDate!: string; // Expected format: "2025-03-30T12:00:00.000Z"
  timeLeft: string = '00:00:00';
  private timerSubscription!: Subscription;

  ngOnInit(): void {
    this.startCountdown();
  }

  startCountdown(): void {
    this.timerSubscription = interval(1000).subscribe(() => {
      this.updateCountdown();
    });
  }

  updateCountdown(): void {
    const now = new Date().getTime();
    const targetTime = new Date(this.targetDate).getTime();
    const timeDifference = targetTime - now;

    if (timeDifference <= 0) {
      this.timeLeft = '00:00:00'; // Countdown finished
      this.timerSubscription.unsubscribe();
      return;
    }

    const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((timeDifference / (1000 * 60)) % 60);
    const seconds = Math.floor((timeDifference / 1000) % 60);

    this.timeLeft =
      this.formatTime(hours) +
      ':' +
      this.formatTime(minutes) +
      ':' +
      this.formatTime(seconds);
  }

  formatTime(time: number): string {
    return time < 10 ? `0${time}` : `${time}`;
  }

  ngOnDestroy(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }
}
