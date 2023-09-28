import { Component } from '@angular/core';

@Component({
  selector: 'app-stopwatch',
  templateUrl: './stopwatch.component.html',
  styleUrls: ['./stopwatch.component.scss']
})
export class StopwatchComponent {

  isRunning: boolean = false;
  intervalId: any;
  timeMilliseconds: number = 0;
  currentTime: string = '00:00:00';

  laps: string[] = [];

  start(){
    if(!this.isRunning){
      this.isRunning = true;
      this.intervalId = setInterval(() => {
        this.timeMilliseconds += 10;
        this.currentTime = this.convertMilliseconds(this.timeMilliseconds);
      }, 10)
    }
  }

  pause(){
    clearInterval(this.intervalId);
    this.isRunning = false;
  }

  restart(){
    this.pause();
    this.timeMilliseconds = 0;;
    this.currentTime = this.convertMilliseconds(this.timeMilliseconds);
  }

  lap(){
    this.laps.push(this.currentTime);
  }

  clearLaps(){
    this.laps= [];
  }

  convertMilliseconds(totalMilliseconds: number):string{;
    const minutes = Math.floor(totalMilliseconds / 60000);
    const seconds = Math.floor((totalMilliseconds % 60000) / 1000);
    let milliseconds = (totalMilliseconds / 1000);

    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${milliseconds.toString().padStart(2, '0').replace('.', '').slice(-2)}`;
  }
}
