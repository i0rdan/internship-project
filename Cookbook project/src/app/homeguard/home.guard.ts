import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { StorageService } from "../storage/storage.service";

export class HomeGuard implements CanActivate {
    private store: StorageService = new StorageService;
    
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        if(this.store.checkUser()) {
          return true
        }
        else {
          alert('Please, sign in!')
          return false;
        }
    }
}