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

@Component({
  selector: 'page-app',
  standalone: true,
  imports: [RouterOutlet, CommonModule, NavbarComponent, CardComponent, CarouselComponent, FooterComponent, ImageCardComponent],
  templateUrl: './page-app.component.html'
})
export class PageAppComponent {
  
  product: Product[] = [];
  paginator: any = {};
  category: any = {};
  currentRoute!: string;

  constructor(
    private router: Router,
    private cartService: CartService,
    private service: ProductService,
    private sharingData: SharingDataService,
  private route: ActivatedRoute) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.urlAfterRedirects;
      }
    });
  }
  
  ngOnInit(): void {
    this.pageUsersEvent();
  }

  isHomePage(): boolean {
    return this.currentRoute === '/';
  }

  pageUsersEvent() {
    this.sharingData.pageProductEventEmitter.subscribe(pageable => {
      this.product = pageable.product;
      this.paginator = pageable.paginator;
      this.category = pageable.category;
    });
  }

}
