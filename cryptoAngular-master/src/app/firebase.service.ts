import { Injectable } from '@angular/core';
import { Firestore, collectionData, collection, query, where, setDoc, deleteDoc, doc, getDocs} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  public datosAsociaciones: Observable<any[]>;

  constructor(public firestore: Firestore, public auth: AuthService) {
    const datos = collection(this.firestore, "asociaciones");
    this.auth.checkAuthState();
    this.datosAsociaciones = collectionData(query(datos, where("userID", "==", this.auth.userID)));
   }

  addCrypto(currency: any){
    setDoc(doc(this.firestore, 'asociaciones', `${currency.id}-${this.auth.userID}`), {
      userID: this.auth.userID,
      currencyID: currency.id,
    });
  }

  deleteCrypto(currency: any){
    deleteDoc(doc(this.firestore, 'asociaciones', `${currency}-${this.auth.userID}`));
  }
}
