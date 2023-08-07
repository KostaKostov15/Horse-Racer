import { Injectable, inject } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import {
  Firestore,
  collectionData,
  collection,
  query,
  where,
} from '@angular/fire/firestore';
import { Observable, map, tap } from 'rxjs';
import { Horse } from '../models/horse';

@Injectable({
  providedIn: 'root',
})
export class HorseService {
  horses$: Observable<Horse[]>;
  firestore: Firestore = inject(Firestore);

  constructor(private afs: AngularFirestore) {
    const horsesCollection = collection(this.firestore, 'horses');
    this.horses$ = collectionData(horsesCollection) as Observable<Horse[]>;
  }

  getHorses(): Observable<Horse[]> {
    return this.horses$;
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
