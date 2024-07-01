import { Component, Input } from '@angular/core';
import { Product } from '../../model/product';

@Component({
  selector: 'navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  @Input() product: Product[] = [];

  @Input() paginator = {}
}
