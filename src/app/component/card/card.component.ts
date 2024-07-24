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
import { CommonModule } from '@angular/common';

@Component({
  selector: 'card',
  standalone: true,
  imports: [RouterModule, PaginatorComponent, CarouselComponent, CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  
  title: string = 'Productos';
  @Input() product: Product[] = [];
  paginator: any = {};
  cartItems: CartProduct[] = [];
  visibleProducts: number = 4;
  showViewMoreButton: boolean = true;
  @Input() supplementProducts: Product[] = [];
  showSupplements: boolean = true;
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
    this.route.url.subscribe(urlSegments => {
      const url = urlSegments.map(segment => segment.path).join('/');
      if (url === '') {
        // URL base (/)
        this.visibleProducts = 4;
        this.showViewMoreButton = true;
        this.showSupplements = true;
        this.service.getProductsByCategory('camiseta').subscribe(products => {
          this.product = products;
          this.sharingData.pageProductEventEmitter.emit({ product: this.product, paginator: this.paginator });
        });
        this.service.getProductsByCategory('suplemento').subscribe(supplements => {
          this.supplementProducts = supplements; // Asignación de datos a supplementProducts
        });
      } else if (url === 'products/page/0') {
        const category = this.route.snapshot.queryParamMap.get('category');
        this.visibleProducts = 8;
        this.showViewMoreButton = false;
        this.showSupplements = false;
        if (category) {
          this.service.getProductsByCategory(category).subscribe(products => {
            this.product = products;
            this.sharingData.pageProductEventEmitter.emit({ product: this.product, paginator: this.paginator });
          });
        } else {
          this.service.findAll().subscribe(products => {
            this.product = products;
            this.sharingData.pageProductEventEmitter.emit({ product: this.product, paginator: this.paginator });
          });
        }
      }
    });
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
