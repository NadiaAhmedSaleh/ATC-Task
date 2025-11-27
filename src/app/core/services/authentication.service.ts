import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";

// a decorator to specify where am i going to use this service

@Injectable({
    providedIn:'root'
})

export class AuthService{
    private baseUrl = 'https://task-api.atcksa.com/api';

    constructor ( private router: Router, private http:HttpClient){}

    login(data:any): Observable<any>{
        return this.http.post(`${this.baseUrl}/auth/login`, data)
    }

    logout(){
        localStorage.removeItem('token');
        this.router.navigate(['']);
    }

}
