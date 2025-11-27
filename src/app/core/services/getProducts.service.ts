import { HttpClient  , HttpParams} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

export interface ProductsResponse {
  data: any[];
  meta?: { page?: number;
     per_page?: number; 
     total?: number;
      last_page?:number;
       current_page: number;
         };
}

@Injectable({providedIn : 'root'})


export class getProductsService {
    private baseUrl = 'https://task-api.atcksa.com/api/products';

    constructor (private http:HttpClient){}

    getProducts(params: {page?: number;
    per_page?: number;
    search?: string;
    is_active?: boolean;}): Observable<ProductsResponse>{
         let httpParams = new HttpParams();
         if (params.page != null) httpParams = httpParams.set('page', String(params.page));
    if (params.per_page != null) httpParams = httpParams.set('per_page', String(params.per_page));
    if (params.search) httpParams = httpParams.set('search', params.search);
    if (params.is_active !== undefined && params.is_active !== null)
      httpParams = httpParams.set('is_active', String(params.is_active));

    return this.http.get<ProductsResponse>(this.baseUrl, { params: httpParams });
    }


    getSingleProduct(id:number | string){
     return this.http.get<{data:any}> (`${this.baseUrl}/${id}`);
    }


    deleteProduct(id: number) {
   return this.http.delete(`${this.baseUrl}/${id}`);
  }
}