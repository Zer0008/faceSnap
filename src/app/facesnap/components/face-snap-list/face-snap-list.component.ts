import {Component, OnInit} from '@angular/core';
import {FaceSnapComponent} from "../face-snap/face-snap.component";
import {Observable} from "rxjs";
import {AsyncPipe} from "@angular/common";
import {SnapFace} from "../../../core/models/snap-face";
import {FaceSnapService} from "../../services/face-snap.service";

@Component({
  selector: 'app-face-snap-list',
  standalone: true,
	imports: [
		FaceSnapComponent,
		AsyncPipe
	],
  templateUrl: './face-snap-list.component.html',
  styleUrl: './face-snap-list.component.scss'
})
export class FaceSnapListComponent implements OnInit {
	faceSnaps$!: Observable<SnapFace[]>;

	constructor(private faceSnapService: FaceSnapService) {}

	ngOnInit(): void {
		this.faceSnaps$ = this.faceSnapService.getFaceSnaps();
	}
}
