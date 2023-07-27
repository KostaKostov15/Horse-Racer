import { Injectable, inject } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Horse } from '../models/horse';

@Injectable({
  providedIn: 'root',
})
export class HorseService {
  horses$: Observable<Horse[]>;
  firestore: Firestore = inject(Firestore);

  constructor() {
    const horsesCollection = collection(this.firestore, 'horses');
    this.horses$ = collectionData(horsesCollection) as Observable<Horse[]>;
  }

  getHorses() {
    return this.horses$;
  }
}
