import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../model/product';
import { RouterModule } from '@angular/router';
import { CartService } from '../../service/cart.service';
import { CartProduct } from '../../model/cart';

@Component({
  selector: 'navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
  @Input() product: Product[] = [];

  @Input() paginator = {}

  //@Input() productCart: CartProduct[] = [];

  cartItems: CartProduct[] = [];

  cartItemCount: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.loadCartItems();
    this.cartService.cartItems$.subscribe((items: CartProduct[]) => {
      this.cartItemCount = items.length;
    });
  }

  loadCartItems(): void {
    this.cartService.loadCartItems().subscribe((items: CartProduct[]) => {
      this.cartItems = items;
    });
  }

}
