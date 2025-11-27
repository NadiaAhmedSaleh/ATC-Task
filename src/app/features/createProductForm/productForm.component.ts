import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { Component } from "@angular/core";
import { createProductService } from '../../core/services/createProduct.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-productForm',
  standalone: true,
  templateUrl: './productForm.component.html',
  styleUrls: ['./productForm.component.css'],
  imports: [ReactiveFormsModule , CommonModule ,FormsModule],
})


export class ProductFormComponent {

  loading=false;
  successMessage = '';
  errorMessage = '';
  isEdit = false;
  productId: number | null = null;

  constructor(private createProductService: createProductService , private router: Router ,   private route: ActivatedRoute,){}

 form = new FormGroup({
  name: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  price: new FormControl(0, { nonNullable: true, validators: [Validators.required] }),
  description: new FormControl('', { nonNullable: true }),
  stock: new FormControl(0, { nonNullable: true, validators: [Validators.required] }),
  currency: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  is_active: new FormControl(true, { nonNullable: true })
});


  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.productId = +id;
      this.loadProduct(this.productId);
    }
  }

  loadProduct(id: number) {
  this.loading = true;
  this.createProductService.getProduct(id).subscribe({
    next: (res) => {
      this.form.patchValue(res.data); 
      this.loading = false;
    },
    error: () => {
      this.loading = false;
    },
  });
}

  onSubmit() {
    if (this.form.invalid) return;
    this.form.markAllAsTouched();

    if (this.isEdit && this.productId) {
      this.updateProduct();
    } else {
      this.createProduct();
    }
  }


  createProduct(){
    this.createProductService.createProduct(this.form.getRawValue()).subscribe({
    next:(res)=>{
        this.successMessage='Product is Created';
        this.errorMessage = '';

        this.form.reset({
            is_active:true
        });
        this.goBack();

    },error:(err)=>{
      this.successMessage = '';
      this.errorMessage = 'Failed';

    }
  })
  }

  updateProduct() {
    this.createProductService.updateProduct(this.productId!, this.form.getRawValue()).subscribe({
      next: () => {
        this.successMessage='Product is Updated';
        this.errorMessage = '';
        this.goBack();
      },
      error: () => {
        this.successMessage = '';
        this.errorMessage = 'Failed to update';
      }
    });
  }


   goBack() {
    this.router.navigate(['/dashboard']);
  }

}

