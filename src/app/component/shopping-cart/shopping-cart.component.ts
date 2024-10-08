import { Component, OnInit } from '@angular/core';
import { Product } from '../../model/product';
import { CartService } from '../../service/cart.service';
import { CommonModule } from '@angular/common';
import { CartProduct } from '../../model/cart';

@Component({
  selector: 'shopping-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css'
})
export class ShoppingCartComponent implements OnInit{

  cartItems: CartProduct[] = [];
  shippingCost: number = 3000;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.loadCartItems();
  }

  loadCartItems(): void {
    this.cartService.loadCartItems().subscribe((items: CartProduct[]) => {
      this.cartItems = items;
    });
  }

  removeFromCart(productId: number): void {
    if (productId) {
      console.log(productId);
      this.cartService.removeFromCart(productId).subscribe(() => {
        this.cartItems = this.cartItems.filter(item => item.productSize.product.id !== productId);
        this.loadCartItems();
      });
    }
  }

  getSubtotal(): number {
    return this.cartItems.reduce((acc, item) => 
      acc + (item.quantity * (item.productSize.product.price * (1 - item.productSize.product.discount / 100))),
    0);
  }
  
  getTotal(): number {
    return this.getSubtotal() + this.shippingCost;
  }

}
