import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CoreModule} from "./core/core.module";
import {LandingPageModule} from "./landing-page/landing-page.module";
import {AuthModule} from "./auth/auth.module";



@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		CoreModule,
		LandingPageModule,
		AuthModule
	]
})
export class AppModule { }
