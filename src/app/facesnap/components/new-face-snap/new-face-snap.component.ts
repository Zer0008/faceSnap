import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {map, Observable, tap} from "rxjs";
import {AsyncPipe, DatePipe, UpperCasePipe} from "@angular/common";
import {Router} from "@angular/router";
import {SnapFace} from "../../../core/models/snap-face";
import {FaceSnapService} from "../../services/face-snap.service";

@Component({
  selector: 'app-new-face-snap',
  standalone: true,
	imports: [ReactiveFormsModule, AsyncPipe, UpperCasePipe, DatePipe],
  templateUrl: './new-face-snap.component.html',
  styleUrl: './new-face-snap.component.scss'
})
export class NewFaceSnapComponent implements OnInit {

	faceSnapForm!: FormGroup;
	faceSnapPreview$!: Observable<SnapFace>;
	urlRegex!: RegExp;

	constructor(private formBuilder: FormBuilder,
				private faceSnapService: FaceSnapService,
				private router: Router) {}

	ngOnInit(): void {
		this.urlRegex = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)/;
		this.initializeForm();
		this.faceSnapPreview$ = this.faceSnapForm.valueChanges.pipe(
			map(formValue => ({
				...formValue,
				createdAt: new Date(),
				snaps: 0,
				id: 0
			}))
		);
	}

	private initializeForm() {
		this.faceSnapForm = this.formBuilder.group({
			title: new FormControl('', [Validators.required, Validators.maxLength(50)]),
			description: new FormControl('', [Validators.required, Validators.maxLength(50)]),
			imageUrl: new FormControl('', [Validators.required, Validators.pattern(this.urlRegex), Validators.maxLength(50)]),
			location: new FormControl('', [Validators.required, Validators.maxLength(50)])
		},{
			updateOn: "blur"
		})
	}

	onSubmit(): void {
		this.faceSnapService.addFaceSnap(this.faceSnapForm.value).pipe(
			tap(snap => {
				this.router.navigateByUrl('snapfaces');
			})
		).subscribe();
	}
}
