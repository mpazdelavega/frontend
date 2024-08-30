import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../model/user';
import { SharingDataService } from '../../service/sharing-data.service';

@Component({
  selector: 'auth',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {

  user: User;

  constructor(private sharingData: SharingDataService) {
    this.user = new User();
  }

  onSubmit() {
    if(!this.user.username || !this.user.password){
      alert('User y/o password requerido');
    } else {
      console.log(this.user);
      this.sharingData.handlerLoginEventEmitter.emit({username: this.user.username, password: this.user.password});
    }
  }

}
