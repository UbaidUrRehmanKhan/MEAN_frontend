import { AuthService } from './../services/auth.service';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import { Router } from '@angular/router';
import { Injectable} from '@angular/core';

@Injectable()
export class AuthenticationGuard implements CanActivate {

    constructor(private userService: AuthService, private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (!this.userService.isLoggedIn()) {
            this.router.navigate(['login']);
        }
        return true;
    }
}
