import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../model/product';
import { RouterModule } from '@angular/router';
import { CartService } from '../../service/cart.service';
import { CartProduct } from '../../model/cart';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faInstagram, faFacebook, faWhatsapp } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'navbar',
  standalone: true,
  imports: [RouterModule, FontAwesomeModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
  @Input() product: Product[] = [];

  @Input() paginator = {}

  @Input() category = {}

  @Input() gender = {}

  //@Input() productCart: CartProduct[] = [];

  cartItems: CartProduct[] = [];

  cartItemCount: number = 0;

  constructor(private cartService: CartService, library: FaIconLibrary) {
    library.addIcons(faInstagram, faFacebook, faWhatsapp);
  }

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
