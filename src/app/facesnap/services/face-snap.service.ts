import { Injectable } from '@angular/core';
import {SnapFace} from "../../core/models/snap-face";
import {SnapType} from "../../core/models/snap-type.type";
import {HttpClient} from "@angular/common/http";
import {map, Observable, switchMap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FaceSnapService {

  	constructor(private httpClient: HttpClient) {}

	getFaceSnaps(): Observable<SnapFace[]> {
		  return this.httpClient.get<SnapFace[]>('http://localhost:3000/facesnaps');
	}

	getFaceSnapById(id: number): Observable<SnapFace> {
		return this.httpClient.get<SnapFace>(`http://localhost:3000/facesnaps/${id}`);
	}

	snapFaceSnapById(faceSnapId: number, type: SnapType): Observable<SnapFace> {
		return this.getFaceSnapById(faceSnapId).pipe(
			map(faceSnap => ({
				...faceSnap,
				snaps: faceSnap.snaps + (type === 'snap' ? 1 : -1)
			})),
			switchMap(updatedFaceSnap =>
				this.httpClient.put<SnapFace>(`http://localhost:3000/facesnaps/${faceSnapId}`, updatedFaceSnap),
			)
		)
	}

	addFaceSnap(formValue: { title: string, description: string, imageUrl: string, location?: string }): Observable<SnapFace> {
		return this.getFaceSnaps().pipe(
			map(facesnaps => [...facesnaps].sort((a,b) => a.id - b.id)),
			map(sortedFacesnaps => sortedFacesnaps[sortedFacesnaps.length - 1]),
			map(previousFacesnap => ({
				...formValue,
				snaps: 0,
				createdDate: new Date(),
				id: previousFacesnap.id + 1
			})),
			switchMap(newFacesnap => this.httpClient.post<SnapFace>(
				'http://localhost:3000/facesnaps',
				newFacesnap)
			)
		);
	}
}
