import {Component, OnInit} from '@angular/core';
import {HeaderComponent} from "./core/components/header/header.component";
import {RouterOutlet} from "@angular/router";
import {delay, interval, map, mergeMap, of, take, tap} from "rxjs";

@Component({
	  selector: 'app-root',
	  standalone: true,
	imports: [HeaderComponent, RouterOutlet],
	  templateUrl: './app.component.html',
	  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

	ngOnInit() {}
}
