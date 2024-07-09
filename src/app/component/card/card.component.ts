import { Component, Input } from '@angular/core';
import { Product } from '../../model/product';
import { ProductService } from '../../service/product.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SharingDataService } from '../../service/sharing-data.service';
import { PaginatorComponent } from '../paginator/paginator.component';
import { CarouselComponent } from '../carousel/carousel.component';
import { CartService } from '../../service/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CartProduct } from '../../model/cart';

@Component({
  selector: 'card',
  standalone: true,
  imports: [RouterModule, PaginatorComponent, CarouselComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  
  title: string = 'Productos';
  product: Product[] = [];
  paginator: any = {};
  cartItems: CartProduct[] = [];

  @Input() productCart: any;

  constructor(
    private service: ProductService,
    private cartService: CartService,
    private sharingData: SharingDataService,
    private router: Router,
    private route: ActivatedRoute, 
    private snackBar: MatSnackBar
  ){}

  ngOnInit(): void {
    //this.loadCartItems();
    if (this.product == undefined || this.product == null || this.product.length == 0) {
      this.route.paramMap.subscribe(params => {
        const page = +(params.get('page') || '0');
        console.log(page)
        this.service.findAllPageable(page).subscribe(pageable => {
          this.product = pageable.content as Product[];
          this.paginator = pageable;
          this.sharingData.pageProductEventEmitter.emit({product: this.product, paginator: this.paginator});
        });
      })
    }
  }

  addToCart(productId: number): void {
    this.cartService.addToCart(productId).subscribe(() => {
      this.cartService.loadCartItems();
      this.showSnackBar("Producto agregado al carro");
    });
  }

  showSnackBar(message: string): void {
    this.cartService.loadCartItems();
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
    
  }

  loadCartItems(): void {
    this.cartService.loadCartItems().subscribe((items: CartProduct[]) => {
      this.cartItems = items;
    });
  }
}
