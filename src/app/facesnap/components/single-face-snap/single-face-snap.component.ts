import {Component, Input, OnInit} from '@angular/core';
import {AsyncPipe, DatePipe, NgClass, NgStyle, UpperCasePipe} from "@angular/common";
import {FaceSnapComponent} from "../face-snap/face-snap.component";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {Observable, tap} from "rxjs";
import {FaceSnapService} from "../../services/face-snap.service";
import {SnapFace} from "../../../core/models/snap-face";

@Component({
  selector: 'app-single-face-snap',
  standalone: true,
	imports: [
		DatePipe,
		UpperCasePipe,
		FaceSnapComponent,
		NgClass,
		NgStyle,
		RouterLink,
		AsyncPipe
	],
  templateUrl: './single-face-snap.component.html',
  styleUrl: './single-face-snap.component.scss'
})
export class SingleFaceSnapComponent implements OnInit {
	faceSnapPreview$!: Observable<SnapFace>;
	snapButtonText!: string;
	userHasSnapped!: boolean;

	constructor(private snapFaceService: FaceSnapService,
				private activatedRoute: ActivatedRoute) {}

	ngOnInit(): void {
		this.prepareFaceSnap();
		this.getFaceSnap();
	}

	private prepareFaceSnap() {
		this.userHasSnapped = false;
		this.snapButtonText = "Oh snap!";
	}

	private getFaceSnap() {
		const routeId = this.activatedRoute.snapshot.params["id"];
		this.faceSnapPreview$ = this.snapFaceService.getFaceSnapById(routeId);
	}

	onSnap(faceSnapId: number) {
		if (this.snapButtonText === 'Oh snap!') {
			this.faceSnapPreview$ = this.snapFaceService.snapFaceSnapById(faceSnapId, 'snap').pipe(
				tap(snap => {
					this.snapButtonText = 'Opps, un snap!';
				})
			);
		} else {
			this.faceSnapPreview$ = this.snapFaceService.snapFaceSnapById(faceSnapId, 'unsnap').pipe(
				tap(snap => {
					this.snapButtonText = 'Oh snap!';
				})
			);
		}
	}

	snapped() {
		//this.snapFaceService.snapFaceSnapById(this.faceSnap.id, 'snap');
		this.userHasSnapped = true;
		this.snapButtonText = "Opps, un snap!";
	}

	unSnapped() {
		//this.snapFaceService.snapFaceSnapById(this.faceSnap.id, 'unsnap');
		this.userHasSnapped = false;
		this.snapButtonText = "Oh snap!";
	}
}
