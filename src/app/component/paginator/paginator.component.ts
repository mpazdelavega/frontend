import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

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

  constructor(private router: Router) {}

  getPages(): number[] {
    return new Array(this.paginator.totalPages).fill(0).map((_, index) => index);
  }

  navigate(page: number): void {
    if (this.category) {
      this.router.navigate(['/products'], { queryParams: { category: this.category, page } });
    } else {
      this.router.navigate([this.url], { queryParams: { page } });
    }
  }
}
