import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../core/services/authentication.service";
import { getProductsService } from "../../core/services/getProducts.service";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SpinnerComponent } from "../../shared/spinner.component";



@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, SpinnerComponent], 
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  products: any[] = [];
  loading = false;
  error = '';
  page = 1;
  per_page = 15;
  total_pages = 1;
  total_items = 0;
  typingTimer: any;
  search = '';
  is_active: boolean | null = null;
  perPageOptions = [10, 15, 25, 50];
  showDeletePopup = false;
  productToDelete: number | null = null;



  constructor(private auth: AuthService ,private getProductsService : getProductsService , private router: Router) {}


  //to fetch the products once logged in
  ngOnInit() {
    this.fetchProducts();
  }

  fetchProducts() {
    this.loading = true;
    this.error = '';
    
    
    this.getProductsService.getProducts({
      page: this.page,
      per_page: this.per_page,
      search: this.search || undefined,
      is_active: this.is_active === null ? undefined : this.is_active
    }).subscribe({
      next: res => {
        this.loading = false;
        this.products = res.data || [];

        this.page = res.meta?.current_page || 1;
        this.per_page = res.meta?.per_page || this.per_page;
        this.total_pages = res.meta?.last_page || 1;
        this.total_items = res.meta?.total || 0;
      },
      error: err => {
        this.loading = false;
        this.error = 'Failed to load products';
      }
    });
  }

  onPerPageChange() {
    this.page = 1;
    this.fetchProducts();
  }

 //debounced search

 onSearchInput() {
  clearTimeout(this.typingTimer);

  this.typingTimer = setTimeout(() => {
    this.page = 1;
    this.fetchProducts();
  }, 500);
 }


  onFilterChange() {
    this.page = 1;
    this.fetchProducts();
  }

  //pagination

  goToPage(p: number) {
    if (p < 1 || p > this.total_pages) return;
    this.page = p;
    this.fetchProducts();
  }

  prev() { if (this.page > 1) this.goToPage(this.page - 1); }
  next() { if (this.page < this.total_pages) this.goToPage(this.page + 1); }


 //navigation to create product 
  createProduct(){
   this.router.navigate(['/productForm'])
  }
 
 //logout button 
  logout() {
    this.auth.logout();
  }

 //navigation to product details
  showDetails(id: number) {
    this.router.navigate(['/products', id]);
  }

//delete product and popup

openDeletePopup(id: number) {
  this.productToDelete = id;
  this.showDeletePopup = true;
}

cancelDelete() {
  this.showDeletePopup = false;
  this.productToDelete = null;
}

confirmDelete() {
  if (!this.productToDelete) return;

  this.loading = true;

  this.getProductsService.deleteProduct(this.productToDelete).subscribe({
    next: () => {
      this.fetchProducts();
      this.loading = false;
      this.showDeletePopup = false;
      this.productToDelete = null;
    },
    error: () => {
      this.error = "Delete failed!";
      this.loading = false;
      this.showDeletePopup = false;
    }
  });
}



//updateProduct


updateProduct(id: number) {
  this.router.navigate(['/productForm', id]);
}


}