import {Routes} from '@angular/router';
import {LandingPageComponent} from "./landing-page/components/landing-page.component";

export const routes: Routes = [
	{ path: '', component: LandingPageComponent },
	{ path: 'snapfaces', loadChildren: () => import('./facesnap/facesnap.module')
			.then(m => m.FacesnapModule) },
	{ path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) }
];
