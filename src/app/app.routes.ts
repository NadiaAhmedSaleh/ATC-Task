import { LoginComponent } from './features/authentication/login.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { Routes } from '@angular/router';
import { AuthenticationGuard } from './core/guards/authentication.guard';
import { ProductFormComponent } from './features/createProductForm/productForm.component';
import { ProductDetailsComponent } from './features/productDetails/productDetails.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },        // default route
  { path: 'dashboard', component: DashboardComponent, canActivate:[AuthenticationGuard]},
  {path:'productForm', component:ProductFormComponent, canActivate:[AuthenticationGuard]},
  {path: 'products/:id', component: ProductDetailsComponent, canActivate: [AuthenticationGuard]},
  { path: 'productForm/:id', component: ProductFormComponent },


];

//routes for app and maps through application