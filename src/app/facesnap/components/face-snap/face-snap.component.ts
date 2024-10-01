import {Component, Input, OnInit} from '@angular/core';
import {DatePipe, NgClass, NgStyle, UpperCasePipe} from "@angular/common";
import {Router} from "@angular/router";
import {SnapFace} from "../../../core/models/snap-face";

@Component({
    selector: 'app-face-snap',
    standalone: true,
	imports: [NgStyle, NgClass, UpperCasePipe, DatePipe],
    templateUrl: './face-snap.component.html',
    styleUrl: './face-snap.component.scss'
})
export class FaceSnapComponent implements OnInit {
	@Input() faceSnap!: SnapFace;

	constructor(private router: Router) {}

    ngOnInit(): void {}

	onViewFaceSnap() {
		this.router.navigateByUrl(`snapfaces/${this.faceSnap.id}`);
	}
}
