import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PageAppComponent } from './component/page-app.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PageAppComponent, MatSnackBarModule,MatDialogModule,MatButtonModule],
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'web-page';
}
