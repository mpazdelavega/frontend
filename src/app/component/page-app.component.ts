import { Component } from '@angular/core';
import { NavbarComponent } from './navbar/navbar.component';
import { CardComponent } from './card/card.component';
import { CarouselComponent } from './carousel/carousel.component';
import { FooterComponent } from './footer/footer.component';
import { ImageCardComponent } from './image-card/image-card.component';

@Component({
  selector: 'page-app',
  standalone: true,
  imports: [NavbarComponent, CardComponent, CarouselComponent, FooterComponent, ImageCardComponent],
  templateUrl: './page-app.component.html'
})
export class PageAppComponent {
  title: string = 'Hola';
}
