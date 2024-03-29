import { Observable } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, interval } from 'rxjs';
import { CustomToastrService } from 'src/app/core/services/custom-toastr.service';

@Component({
  selector: 'app-count-down',
  templateUrl: './count-down.component.html',
  styleUrls: ['./count-down.component.css']
})
export class CountDownComponent implements OnInit, OnDestroy {
  
  /** @param secondsToDay number */
  public secondsToDay: number | undefined;

  /** @param minutesToDay number */
  public minutesToDay: number | undefined;

  /** @param hoursToDay number */
  public hoursToDay: number | undefined;

  /** @param daysToDay number */
  public daysToDay: number | undefined;

  /** @param subscription Subscription */
  private subscription: Subscription | undefined;

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
  private timeDifference: number | undefined;

  /**
    @param _customToastrService CustomToastrService
   */
  constructor(private _customToastrService: CustomToastrService) {    
  }

  /**
   * @inheritdoc
   */
  ngOnInit() {
    this.countDownByInterval();
    this.countDownByCustomObservable();
  }

  /**
   * @inheritdoc
   */
  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  /**
   * Count down by interval.
   */
  private countDownByInterval(): void {
    this.subscription = interval(1000)
      .subscribe(x => { this.getTimeDifference(); });
  }

  /**
   * Count down by custom observable.
   */
  private countDownByCustomObservable(): void {
    const customCountDownObservable = Observable.create((observer: { next: (arg0: number) => void; error: (arg0: Error) => void; complete: () => void; }) => {
      let timeDifference = this.dDay.getTime() - new  Date().getTime();
      setInterval(() => {
        observer.next(timeDifference);
        if (timeDifference < 0) {
          observer.error(new Error("Countdown finished badly"));
        }
        if(timeDifference === 0){
          observer.complete();
        }
        timeDifference = this.dDay.getTime() - new  Date().getTime();
      }, 1000);
    });

    customCountDownObservable.subscribe(
      (data: number) => {
        this.allocateTimeUnits(this.timeDifference);
      },
      (errorMessage: string) => {
        this._customToastrService.customErrorOrBadRequest(errorMessage, null);
      },
      () => {
        this._customToastrService.displaySuccessMessage("Countdown finished");
      });
  }

  /**
   * Get time difference.
   */
  private getTimeDifference(): void {
    this.timeDifference = this.dDay.getTime() - new  Date().getTime();
    this.allocateTimeUnits(this.timeDifference);
  }

  /**
   * Allocate time units.
   * 
   * @param timeDifference
   */
  private allocateTimeUnits(timeDifference: any): void {
    this.secondsToDay = Math.floor((timeDifference) / (this.milliSecondsInASecond) % this.secondsInAMinute);
    this.minutesToDay = Math.floor((timeDifference) / (this.milliSecondsInASecond * this.minutesInAnHour) % this.secondsInAMinute);
    this.hoursToDay = Math.floor((timeDifference) / (this.milliSecondsInASecond * this.minutesInAnHour * this.secondsInAMinute) % this.hoursInADay);
    this.daysToDay = Math.floor((timeDifference) / (this.milliSecondsInASecond * this.minutesInAnHour * this.secondsInAMinute * this.hoursInADay));
  }
}
