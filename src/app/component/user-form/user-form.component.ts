import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../../model/user';
import { ActivatedRoute } from '@angular/router';
import { SharingDataService } from '../../service/sharing-data.service';
import { UserService } from '../../service/user.service';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent implements OnInit {
  user: User;
  errors: any = {};

  constructor(
    private route: ActivatedRoute,
    private sharingData: SharingDataService,
    private userService: UserService,
    private service: UserService) {
    this.user = new User();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id: number = +(params.get('id') || '0');
      if (id > 0) {
        this.userService.findById(id).subscribe(
          (user) => {
            this.user = user;
          },
          (error) => {
            console.error('Error al obtener el usuario:', error);
          }
        );
      }
    });
  }

  onSubmit(userForm: NgForm): void {
    // if (userForm.valid) {
      this.sharingData.newUserEventEmitter.emit(this.user);
      console.log(this.user);
    // }
    // userForm.reset();
    // userForm.resetForm();
  }

  onClear(userForm: NgForm): void {
    this.user = new User();
    userForm.reset();
    userForm.resetForm();
  }
}
