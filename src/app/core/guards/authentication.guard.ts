import { Injectable } from "@angular/core";
import { Router , CanActivate} from "@angular/router";
import jwt_decode from "jwt-decode";



@Injectable({
    providedIn: 'root'
})

export class AuthenticationGuard implements CanActivate{
    constructor ( private router: Router){}

   canActivate(): boolean {
    const token = localStorage.getItem("token");
    if (!token) return this.logout();

    try {
      const { exp }: any = jwt_decode(token);
      if (exp && exp < Date.now() / 1000) return this.logout(); 
      return true;
    } catch {
      return this.logout();
    }
  }

  private logout(): boolean {
    localStorage.removeItem("token");
    this.router.navigate([""]);
    return false;
  }


}