import { Component } from '@angular/core';
import { NavbarComponent } from './navbar/navbar.component';
import { CardComponent } from './card/card.component';
import { CarouselComponent } from './carousel/carousel.component';
import { FooterComponent } from './footer/footer.component';
import { ImageCardComponent } from './image-card/image-card.component';
import { Product } from '../model/product';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { ProductService } from '../service/product.service';
import { SharingDataService } from '../service/sharing-data.service';

@Component({
  selector: 'page-app',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, CardComponent, CarouselComponent, FooterComponent, ImageCardComponent],
  templateUrl: './page-app.component.html'
})
export class PageAppComponent {
  
  product: Product[] = [];
  paginator: any = {};

  constructor(
    private router: Router,
    private service: ProductService,
    private sharingData: SharingDataService,
  private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    // this.service.findAll().subscribe(users => this.users = users);

    // this.route.paramMap.subscribe(params => {
    //   const page = +(params.get('page') || '0');
    //   console.log(page)
    //   // this.service.findAllPageable(page).subscribe(pageable => this.users = pageable.content as User[]);
    // })
    this.pageUsersEvent();
  }

  pageUsersEvent() {
    this.sharingData.pageProductEventEmitter.subscribe(pageable => {
      this.product = pageable.product;
      this.paginator = pageable.paginator;
    });
  }

}
