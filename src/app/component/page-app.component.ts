import { Component } from '@angular/core';
import { NavbarComponent } from './navbar/navbar.component';
import { CardComponent } from './card/card.component';
import { CarouselComponent } from './carousel/carousel.component';
import { FooterComponent } from './footer/footer.component';
import { ImageCardComponent } from './image-card/image-card.component';
import { Product } from '../model/product';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { ProductService } from '../service/product.service';
import { SharingDataService } from '../service/sharing-data.service';
import { CommonModule } from '@angular/common';
import { CartService } from '../service/cart.service';
import { UserService } from '../service/user.service';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { User } from '../model/user';
import Swal from 'sweetalert2';

@Component({
  selector: 'page-app',
  standalone: true,
  imports: [RouterOutlet, CommonModule, NavbarComponent, CardComponent, CarouselComponent, FooterComponent, ImageCardComponent],
  templateUrl: './page-app.component.html'
})
export class PageAppComponent {
  
  users: User[] = [];
  product: Product[] = [];
  paginator: any = {};
  category: any = {};
  gender: any = {};
  currentRoute!: string;

  constructor(
    private router: Router,
    private cartService: CartService,
    private service: ProductService,
    private userService: UserService,
    private sharingData: SharingDataService,
  private route: ActivatedRoute) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.urlAfterRedirects;
      }
    });
  }
  
  ngOnInit(): void {
    this.addUser();
    this.removeUser();
    this.findUserById();
    this.pageUsersEvent();
    this.handlerLogin();
  }

  isHomePage(): boolean {
    return this.currentRoute === '/';
  }


  findUserById() {
    this.sharingData.findUserByIdEventEmitter.subscribe(id => {

      const user = this.users.find(user => user.id == id);

      this.sharingData.selectUserEventEmitter.emit(user);
    })
  }

  handlerLogin(){
    this.sharingData.handlerLoginEventEmitter.subscribe(({username, password}) =>{
      console.log(username + ' ' + password);
    })
  }

  pageUsersEvent() {
    this.sharingData.pageProductEventEmitter.subscribe(pageable => {
      this.product = pageable.product;
      this.paginator = pageable.paginator;
      this.category = pageable.category;
      this.gender = pageable.gender;
    });
  }

  addUser() {
    this.sharingData.newUserEventEmitter.subscribe(user => {
      if (user.id > 0) {
        this.userService.update(user).subscribe(
          {
            next: (userUpdated) => {
              this.users = this.users.map(u => (u.id == userUpdated.id) ? { ...userUpdated } : u);
              this.router.navigate(['/users'], {
                state: {
                  users: this.users,
                  paginator: this.paginator
               } });
            
              Swal.fire({
                title: "Actualizado!",
                text: "Usuario editado con exito!",
                icon: "success"
              });
            },
            error: (err) => {
              // console.log(err.error)
              if (err.status == 400) {
                this.sharingData.errorsUserFormEventEmitter.emit(err.error);
              }
            }
          })

      } else {
        this.userService.create(user).subscribe( {
          next: userNew =>  {
          console.log(user)
          this.users = [... this.users, { ...userNew }];

            this.router.navigate(['/users'], {
              state: {
                users: this.users,
                paginator: this.paginator
             } });
            
            Swal.fire({
              title: "Creado nuevo usuario!",
              text: "Usuario creado con exito!",
              icon: "success"
            });
          },
          error: (err) => {
            // console.log(err.error)
            // console.log(err.status)
            if (err.status == 400) {
              this.sharingData.errorsUserFormEventEmitter.emit(err.error);
            }

        }})
      }

    })
  }

  removeUser(): void {
    this.sharingData.idUserEventEmitter.subscribe(id => {
      Swal.fire({
        title: "Seguro que quiere eliminar?",
        text: "Cuidado el usuario sera eliminado del sistema!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si"
      }).then((result) => {
        if (result.isConfirmed) {

          this.userService.remove(id).subscribe(() => {
            this.users = this.users.filter(user => user.id != id);
            this.router.navigate(['/users/create'], { skipLocationChange: true }).then(() => {
              this.router.navigate(['/users'], {
                state: {
                  users: this.users,
                  paginator: this.paginator
               } });
            });
          })


          Swal.fire({
            title: "Eliminado!",
            text: "Usuario eliminado con exito.",
            icon: "success"
          });
        }
      });
    });
  }

}
