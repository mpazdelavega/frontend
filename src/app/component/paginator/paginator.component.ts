import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'paginator',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './paginator.component.html'
})
export class PaginatorComponent {
  @Input() url: string = '';
  @Input() paginator: any = {};
  @Input() category: string = '';
  @Input() gender: string = '';
  @Input() brand: string = '';
  currentUrl: string = '';
  currentParams: any = {};

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.url.subscribe(url => {
      this.currentUrl = this.router.url.split('?')[0];
      this.updateCurrentParams();
    });
  }

  updateCurrentParams() {
    const currentRoute = this.router.url.split('?')[0];
    this.route.queryParams.subscribe(params => {
      if (currentRoute === '/products/by-category-gender') {
        this.currentParams = { category: params['category'], gender: params['gender'], page: 0 };
      } else if (currentRoute === '/products/filter2') {
        this.currentParams = { category: params['category'], page: 0 };
      } else {
        this.currentParams = { page: 0 };
      }
    });
  }

  getQueryParams(page: number) {
    const params = { ...this.currentParams, page };
    return params;
  }

  // ngOnInit(): void {
  //   if (this.router.url.startsWith('/products/page/')) {
  //     this.currentUrlState = false;
  //   }
  //   console.log("Categoria desde Paginator AQUIIIIIIIII: " + this.category)
  //   console.log(this.currentUrlState)
  // }


  // getPages(): number[] {
  //   return new Array(this.paginator.totalPages).fill(0).map((_, index) => index);
  // }

  // navigate(page: number): void {
  //   if (this.category) {
  //     this.router.navigate(['/products'], { queryParams: { category: this.category, page } });
  //   } else {
  //     this.router.navigate([this.url], { queryParams: { page } });
  //   }
  // }
}
