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
  category: string = '';
  url: string = '';
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
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const category = params['category'];
      const page = params['page'] || 0;

      // Verificar si estamos en la página principal
      if (this.router.url === '/') {
        this.visibleProducts = 4;
        this.showViewMoreButton = true;
        this.showSupplements = true;

        this.service.getProductsByCategoryHome('camiseta').subscribe(products => {
          this.product = products;
          this.sharingData.pageProductEventEmitter.emit({ product: this.product, paginator: this.paginator });
        });

        this.service.getProductsByCategoryHome('suplemento').subscribe(supplements => {
          this.supplementProducts = supplements;
        });
      }
      // Verificar si estamos en una página de productos con paginación
      else if (this.router.url.startsWith('/products/page/')) {
        this.url = '/products/page';
        this.visibleProducts = 8;
        this.showViewMoreButton = false;
        this.showSupplements = false;
        this.route.paramMap.subscribe(params => {
          const page = +(params.get('page') || '0');
          this.service.findAllPageable(page).subscribe(pageable => {
            this.product = pageable.content as Product[];
            this.paginator = pageable;
            //console.log('Todos los productos:', pageable);
            this.sharingData.pageProductEventEmitter.emit({ product: this.product, paginator: this.paginator });
          });
        });

      }
      // Nuevo caso para la URL /products/filter2
      else if (this.router.url.startsWith('/products/filter2')) {
          this.url = '/products/filter2';
          this.visibleProducts = 8;
          this.showViewMoreButton = false;
          this.showSupplements = false;
          // Filtrar productos por categoría
          this.service.getProductsByCategory(category, page).subscribe(pageable => {
            this.product = pageable.content as Product[];
            this.paginator = pageable;
            this.category = category;
            console.log("Categoria desde Card: " + category)
            //console.log('Filtered products by category:', pageable);
            this.sharingData.pageProductEventEmitter.emit({ product: this.product, paginator: this.paginator, category: this.category });
          });
        

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
