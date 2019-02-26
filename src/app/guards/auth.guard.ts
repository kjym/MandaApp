import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  auth: AuthService;
  router: Router;
  canActivate(): boolean {
    if(!this.auth.isLogedIn()){
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
