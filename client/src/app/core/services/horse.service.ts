import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { Observable } from 'rxjs';
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
      .valueChanges();
  }

  createHorse(horseData: Horse) {
    return this.afs.collection('horses').add(horseData);
  }
}
