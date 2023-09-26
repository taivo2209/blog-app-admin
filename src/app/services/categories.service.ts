import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  collectionData,
  updateDoc,
  deleteDoc,
  doc,
} from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private firestore: Firestore, private toastr: ToastrService) {}

  saveData(data: any) {
    // let subCategoryData = {
    //   subCategory: 'subCategory',
    // };
    const collectionItem = collection(this.firestore, 'categories');

    // console.log(collectionItem);

    addDoc(collectionItem, data)
      .then(() => {
        this.toastr.success('Data added successfully!!');
        //   const subCollectionItem = collection(
        //     doc(collectionItem, docRef.id),
        //     'subcategories'
        //   );
        //   addDoc(subCollectionItem, subCategoryData)
        //     .then((docRef1) => {
        //       console.log(docRef1);
        //       const subSubCollectionItem = collection(
        //         doc(subCollectionItem, docRef1.id),
        //         'subsubcategories'
        //       );
        //       addDoc(subSubCollectionItem, subCategoryData)
        //         .then((docRef2) => {
        //           console.log('Successfully added');
        //         })
        //         .catch((err) => {
        //           console.log(err);
        //         });
        //     })
        //     .catch((err) => {
        //       console.log(err);
        //     });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getData() {
    const collectionItem = collection(this.firestore, 'categories');
    //   const querySnapshot = await getDocs(collectionItem);
    //   const categoriesData = querySnapshot.docs.map((doc: any) => {
    //     return {
    //       id: doc.id,
    //       ...doc.data(),
    //     };
    //   });

    //   return categoriesData;
    return collectionData(collectionItem, { idField: 'id' });
  }

  updateData(id: string, data: any) {
    const docItem = doc(this.firestore, 'categories', id);
    updateDoc(docItem, data)
      .then(() => {
        this.toastr.success('Data Edited successfully!!');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  deleteData(id: string) {
    const docItem = doc(this.firestore, 'categories', id);
    deleteDoc(docItem)
      .then(() => {
        this.toastr.warning('Data Deleted successfully!!');
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
