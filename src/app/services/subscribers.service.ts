import { Injectable } from '@angular/core';
import { Firestore, collectionData, deleteDoc, doc } from '@angular/fire/firestore';
import { collection } from '@firebase/firestore';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class SubscribersService {
  constructor(private firestore: Firestore, private toastr: ToastrService) {}

  getData() {
    const collectionItem = collection(this.firestore, 'subscribers');
    return collectionData(collectionItem, { idField: 'id' });
  }

  deleteData(id: string) {
    const docItem = doc(this.firestore, 'subscribers', id);
    deleteDoc(docItem)
      .then(() => {
        this.toastr.warning('Data Deleted successfully!!');
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
