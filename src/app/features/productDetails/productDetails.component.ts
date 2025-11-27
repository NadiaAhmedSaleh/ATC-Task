import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { getProductsService } from '../../core/services/getProducts.service';
import { switchMap} from 'rxjs/operators';
import { SpinnerComponent } from "../../shared/spinner.component";



@Component({
  selector: 'app-productDetails',
  standalone: true,
  imports: [CommonModule , SpinnerComponent],
  templateUrl: './productDetails.component.html',
  styleUrls: ['./productDetails.component.css']
})

export class ProductDetailsComponent {
  loading = true;
  error = '';
  product: any = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productsService: getProductsService
  ){
   this.route.paramMap.pipe(switchMap(params => {
    const id = params.get('id');
    this.loading = true;
    this.error = '';
    return this.productsService.getSingleProduct(id!)
   })).subscribe({
    next: res =>{
        this.product = res.data;
        this.loading = false;
    },
    error: err =>{
        this.loading = false;
        this.error = 'Failed'
    }
   });
  }

    goBack() {
    this.router.navigate(['/dashboard']);
  }

}

