import { HttpClient  , HttpParams} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({providedIn : 'root'})

export class createProductService {
    private baseUrl = 'https://task-api.atcksa.com/api/products';

    constructor (private http:HttpClient){}

    createProduct(
        data:{
            name:string;
            description?:string;
            stock:number;
            price:number;
            currency: string;
            is_active:boolean;
        }
    ):Observable<any>{
        return this.http.post(this.baseUrl, data)
    }


    updateProduct(id: number, 
    data: {
    name: string;
    description?: string;
    stock: number;
    price: number;
    currency: string;
    is_active: boolean;
  }): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, data); 
  }

  

  getProduct(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }
}