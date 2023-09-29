import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-stopwatch',
  templateUrl: './stopwatch.component.html',
  styleUrls: ['./stopwatch.component.scss']
})
export class StopwatchComponent {

  @ViewChild('stopw') stopwatch!: ElementRef;

  isRunning: boolean = false;
  intervalMilliseconds: any;
  intervalSeconds: any;
  timeMilliseconds: number = 0;
  currentTime: string = '00:00:00';

  laps: string[] = [];

  start(){
    if(!this.isRunning){
      this.isRunning = true;
      this.intervalMilliseconds = setInterval(() => {
        this.timeMilliseconds += 10;
        this.currentTime = this.convertMilliseconds(this.timeMilliseconds);
      }, 10)

      this.intervalSeconds = setInterval(() => {
        this.stopwatch.nativeElement.style.transform = 'scale(1.05)'

        setTimeout(() => {
          this.stopwatch.nativeElement.style.transform = 'scale(1)'
        }, 500)
      }, 1000)
    }
  }

  pause(){
    clearInterval(this.intervalMilliseconds);
    clearInterval(this.intervalSeconds);
    this.isRunning = false;
  }

  restart(){
    this.pause();
    this.timeMilliseconds = 0;;
    this.currentTime = this.convertMilliseconds(this.timeMilliseconds);
  }

  lap(){
    if(this.isRunning)
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

  buttonEffect(btn: HTMLElement){
    btn.classList.add('animation-btn')
    setTimeout(() => {
      btn.classList.remove('animation-btn')
    }, 1000);
  }
}
