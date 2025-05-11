import { Component } from '@angular/core';
import { UserAppComponent } from './components/user-app/user-app.component';

@Component({
  selector: 'app-root',
  imports: [UserAppComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-5-users-app';
}
