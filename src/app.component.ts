import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppViews } from '../utilities/enums';
import { isDefNotNull } from '../utilities/helper-functions';

@Component({
  selector: 'my-app',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  AppViews = AppViews;
  @ViewChild('heartIcon') heartIcon: ElementRef;
  @ViewChild('playAgainButton') playAgainButton: ElementRef;
  @ViewChild('mainView') mainView: ElementRef;

  currentView = AppViews.FirstView;

  heartCountDown = null;
  heartCountDownIteration = 0;
  heartCountDownTimeSec = 1.25;

  constructor(private renderer: Renderer2) {}

  ngOnInit() {}

  onPlayAgainButton(event) {
    this.currentView = AppViews.FirstView;
  }

  onHeartClick(evt) {
    // this.currentView = AppViews.SecondView;
    // Do Nothing for now
  }

  onHeartMouseDown(evt) {
    if (!isDefNotNull(this.heartCountDown)) {
      this.heartCountDown = setInterval(() => {
        ++this.heartCountDownIteration;

        if (this.heartCountDownIteration === 6) {
          this.currentView = AppViews.SecondView;
          this.onHeartMouseUp();
        }
      }, 1000 * this.heartCountDownTimeSec);
    }
  }

  onHeartMouseUp(evt?) {
    this.heartCountDownIteration = 0;
    clearInterval(this.heartCountDown);
    this.heartCountDown = null;
  }

  //#region Fix Infinite Timer

  onHeartMouseOut(evt?) {
    this.renderer.listen(this.mainView.nativeElement, 'mouseup', (evt) => {
      this.onHeartMouseUp();
    });
  }

  //endregion
}
