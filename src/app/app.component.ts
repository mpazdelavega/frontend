import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PageAppComponent } from './component/page-app.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PageAppComponent],
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'web-page';
}
