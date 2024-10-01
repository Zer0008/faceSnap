import {Injectable} from "@angular/core";
import {
	ActivatedRouteSnapshot,
	CanActivate,
	GuardResult,
	MaybeAsync,
	Router,
	RouterStateSnapshot
} from "@angular/router";
import {AuthService} from "../../auth/login/services/auth.service";

@Injectable({
	providedIn: 'root'
})
export class AuthGuard implements CanActivate {
	constructor(private router: Router, private authService: AuthService) { }

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
		const token = this.authService.getToken();
		if (token) {
			return true;
		} else {
			this.router.navigateByUrl('/auth/login');
			return false;
		}
	}
}
