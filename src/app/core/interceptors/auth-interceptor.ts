import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {AuthService} from "../../auth/login/services/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor{

	constructor(private authService: AuthService){}

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		const headers = new HttpHeaders()
			.append("Authorization", "Bearer " + this.authService.getToken());
		const modifiedRequest: HttpRequest<any> = req.clone({headers});
		return next.handle(modifiedRequest);
	}

}
