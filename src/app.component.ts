import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppViews } from '../enums';

@Component({
  selector: 'my-app',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  AppViews = AppViews;

  currentView = AppViews.FirstView;
}
