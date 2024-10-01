import {SnapType} from "./snap-type.type";

export class SnapFace {

	location?: string;
	id!: number;

	constructor(public title: string,
				public description: string,
				public createdAt: Date,
				public imageUrl: string,
				public snaps: number) {}

	addSnap() {
		this.snaps++;
	}

	removeSnap() {
		this.snaps--;
	}

	snap(snapType: SnapType) {
		if (snapType === 'snap') {
			this.addSnap();
		} else if (snapType === 'unsnap') {
			this.removeSnap();
		}
	}
}
