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
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'card',
  standalone: true,
  imports: [RouterModule, PaginatorComponent, CarouselComponent, CommonModule, FormsModule],
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
  gender: string = '';
  brand: string = '';
  // url: string = '';
  currentUrl: string = '';
  @Input() supplementProducts: Product[] = [];
  showSupplements: boolean = true;
  @Input() productCart: any;
  showFilters: boolean = false;
  genders: string[] = ['hombre', 'mujer'];
  brands: string[] = ['Adidas', 'Nike'];
  selectedGenders: { [key: string]: boolean } = {};
  selectedBrands: { [key: string]: boolean } = {};
  genderSelected: string[] = [];
  brandSelected: string[] = [];

  constructor(
    private service: ProductService,
    private cartService: CartService,
    private sharingData: SharingDataService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {

    this.currentUrl = this.router.url.split('?')[0];
    this.route.queryParams.subscribe(params => {
      this.category = params['category'] || '';
      this.gender = params['gender'] || '';
      this.brand = params['brand'] || '';

      //this.loadProducts();
    });

    this.route.queryParams.subscribe(params => {
      const category = params['category'];
      const page = params['page'] || 0;
      const gender = params['gender'];

      if (this.router.url === '/') {
        this.visibleProducts = 4;
        this.showViewMoreButton = true;
        this.showSupplements = true;
        this.showFilters = false;
        this.service.getProductsByCategoryHome('camiseta').subscribe(products => {
          this.product = products;
          this.sharingData.pageProductEventEmitter.emit({ product: this.product, paginator: this.paginator });
        });

        this.service.getProductsByCategoryHome('suplemento').subscribe(supplements => {
          this.supplementProducts = supplements;
        });
      }
      else if (this.router.url.startsWith('/products/page')) {
        //this.currentUrl = '/products/page';
        this.visibleProducts = 8;
        this.showViewMoreButton = false;
        this.showSupplements = false;
        this.showFilters = true;
        this.route.paramMap.subscribe(params => {
          //const page = +(params.get('page') || '0');
          this.service.findAllPageable(page).subscribe(pageable => {
            this.product = pageable.content as Product[];
            this.paginator = pageable;
            this.sharingData.pageProductEventEmitter.emit({ product: this.product, paginator: this.paginator });
          });
        });

      }
      else if (this.router.url.startsWith('/products/filter2')) {
        //this.currentUrl = '/products/filter2';
        this.visibleProducts = 8;
        this.showViewMoreButton = false;
        this.showSupplements = false;
        this.service.getProductsByCategory(category, page).subscribe(pageable => {
          this.product = pageable.content as Product[];
          this.paginator = pageable;
          this.category = category;
          this.sharingData.pageProductEventEmitter.emit({ product: this.product, paginator: this.paginator, category: this.category });
        });
      }
      else if (this.router.url.startsWith('/products/by-category-gender')) {
        //this.currentUrl = '/products/by-category-gender';
        this.visibleProducts = 8;
        this.showViewMoreButton = false;
        this.showSupplements = false;
        this.service.getProductsByCategoryAndGender(category, gender, page).subscribe(pageable => {
          this.product = pageable.content as Product[];
          this.paginator = pageable;
          this.category = category;
          this.gender = gender;
          this.sharingData.pageProductEventEmitter.emit({ product: this.product, paginator: this.paginator, category: this.category, gender: this.gender });
        });
      }
      else if (this.router.url.startsWith('/products/filter-products')) {
        //this.currentUrl = '/products/filter-products';
        this.visibleProducts = 8;
        this.showViewMoreButton = false;
        this.showSupplements = false;
        this.showFilters = true;
        this.service.getProductsFiltered(this.genderSelected, this.brandSelected, page).subscribe(pageable => {
          this.product = pageable.content as Product[];
          this.paginator = pageable;
          this.sharingData.pageProductEventEmitter.emit({ product: this.product, paginator: this.paginator });
        });
      }
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

  onFilterChange(): void {
    const selectedGenders = Object.keys(this.selectedGenders).filter(gender => this.selectedGenders[gender]);
    const selectedBrands = Object.keys(this.selectedBrands).filter(brand => this.selectedBrands[brand]);
    this.genderSelected = selectedGenders;
    this.brandSelected = selectedBrands;
    const queryParams: any = {};
    if (selectedGenders.length > 0) {
      queryParams.gender = selectedGenders.join(',');
    }
    if (selectedBrands.length > 0) {
      queryParams.brand = selectedBrands.join(',');
    }
    this.router.navigate(['/products/filter-products'], { queryParams });
  }
}
