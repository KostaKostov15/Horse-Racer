import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { Observable, map } from 'rxjs';
import { Horse } from '../models/horse';

@Injectable({
  providedIn: 'root',
})
export class HorseService {
  constructor(private afs: AngularFirestore) {}

  getHorses(): Observable<Horse[]> {
    return this.afs.collection<Horse>('horses').valueChanges();
  }

  getUserHorses(userId: string): Observable<Horse[]> {
    return this.afs
      .collection<Horse>('horses', (ref) => ref.where('owner', '==', userId))
      .snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((a) => {
            const data = a.payload.doc.data() as Horse;
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
      );
  }

  createHorse(horseData: Horse) {
    return this.afs.collection('horses').add(horseData);
  }

  updateHorse(horseId: string, horseData: any) {
    return this.afs.collection('horses').doc(horseId).update(horseData);
  }

  deleteHorse(horseId: string) {
    return this.afs.collection('horses').doc(horseId).delete();
  }
}
