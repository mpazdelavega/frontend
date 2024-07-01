import { Component } from '@angular/core';
import { Product } from '../../model/product';
import { ProductService } from '../../service/product.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SharingDataService } from '../../service/sharing-data.service';
import { PaginatorComponent } from '../paginator/paginator.component';

@Component({
  selector: 'card',
  standalone: true,
  imports: [RouterModule, PaginatorComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  
  title: string = 'Productos';

  product: Product[] = [];
  paginator: any = {};

  constructor(
    private service: ProductService,
    private sharingData: SharingDataService,
    private router: Router,
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {
    if (this.product == undefined || this.product == null || this.product.length == 0) {
      console.log('consulta findAll')
      // this.service.findAll().subscribe(product => this.product = product);
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

}
