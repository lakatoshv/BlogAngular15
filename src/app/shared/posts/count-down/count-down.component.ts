import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-count-down',
  templateUrl: './count-down.component.html',
  styleUrls: ['./count-down.component.css']
})
export class CountDownComponent implements OnInit, OnDestroy {
  /** @param secondsToDay number */
  public secondsToDay: number;

  /** @param minutesToDay number */
  public minutesToDay: number;

  /** @param hoursToDay number */
  public hoursToDay: number;

  /** @param daysToDay number */
  public daysToDay: number;

  /** @param subscription Subscription */
  private subscription: Subscription;

  /** @param dateNow Date */
  private dateNow: Date = new Date();

  /** @param dDay Date */
  private dDay = new Date(
    this.dateNow.setHours((this.dateNow.getHours() + 5),
    this.dateNow.getMinutes(),
    this.dateNow.getSeconds(),
    this.dateNow.getMilliseconds()));

  /** @param milliSecondsInASecond number */
  private milliSecondsInASecond: number = 1000;

  /** @param hoursInADay number */
  private hoursInADay: number = 24;

  /** @param minutesInAnHour number */
  private minutesInAnHour = 60;
  
  /** @param secondsInAMinute number */
  private secondsInAMinute: number  = 60;

  /** @param timeDifference number */
  private timeDifference: number;


  ngOnInit() {
    this.subscription = interval(1000)
      .subscribe(x => { this.getTimeDifference(); });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  /**
   * Get time difference.
   * 
   * @returns void.
   */
  private getTimeDifference(): void {
    this.timeDifference = this.dDay.getTime() - new  Date().getTime();
    this.allocateTimeUnits(this.timeDifference);
  }

  /**
   * Allocate time units.
   * @param timeDifference
   * 
   * @returns void. 
   */
  private allocateTimeUnits(timeDifference): void {
    this.secondsToDay = Math.floor((timeDifference) / (this.milliSecondsInASecond) % this.secondsInAMinute);
    this.minutesToDay = Math.floor((timeDifference) / (this.milliSecondsInASecond * this.minutesInAnHour) % this.secondsInAMinute);
    this.hoursToDay = Math.floor((timeDifference) / (this.milliSecondsInASecond * this.minutesInAnHour * this.secondsInAMinute) % this.hoursInADay);
    this.daysToDay = Math.floor((timeDifference) / (this.milliSecondsInASecond * this.minutesInAnHour * this.secondsInAMinute * this.hoursInADay));
  }
}
