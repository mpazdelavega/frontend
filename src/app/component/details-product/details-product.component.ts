import { Component, OnInit } from '@angular/core';
import { Product } from '../../model/product';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../service/product.service';
import { CommonModule } from '@angular/common';
import { CartService } from '../../service/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { SizeService } from '../../service/size.service';
import { Size } from '../../model/size';

@Component({
  selector: 'app-details-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './details-product.component.html',
  styleUrl: './details-product.component.css'
})
export class DetailsProductComponent implements OnInit {

  product: Product | undefined;
  //sizes: string[] = ['S', 'M', 'L', 'XL'];
  sizes: Size[] = [];
  selectedSize!: string;

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
    private productService: ProductService,
    private snackBar: MatSnackBar,
    private sizeService: SizeService
  ) { }

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.productService.getProductById(+productId).subscribe(product => {
        this.product = product;
      });
    }
    this.sizeService.getSizes().subscribe(
      (data: Size[]) => {
        this.sizes = data;
      },
      (error) => {
        console.error('Error fetching sizes', error);
      }
    );

  }

  addToCart(productId: number): void {
    if (!this.selectedSize) {
      alert('Por favor selecciona un tamaño.');
      return;
    }
    console.log('Tamaño seleccionado: ' + this.selectedSize);
    this.cartService.addToCart(productId, this.selectedSize).subscribe(() => {
      console.log("Producto agregado al carrito con tamaño:", this.selectedSize);
      this.showSnackBar('Producto agregado al carrito');
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

}
