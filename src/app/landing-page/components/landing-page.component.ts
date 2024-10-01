import { Component } from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {FormsModule, NgForm} from "@angular/forms";

@Component({
	selector: 'app-landing-page',
	standalone: true,
	imports: [
		FormsModule,
		RouterLink
	],
	templateUrl: './landing-page.component.html',
	styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent {

	userEmail!: string;

	constructor(private router: Router) {}

	goToSnapfaceList() {
		this.router.navigateByUrl('snapfaces');
	}

	sendEmail(form: NgForm) {
		console.log(form.value);
	}
}
