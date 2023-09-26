import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  collectionData,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
} from '@angular/fire/firestore';
import {
  Storage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from '@angular/fire/storage';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(
    private storage: Storage = inject(Storage),
    private firestore: Firestore,
    private toastr: ToastrService,
    private router: Router
  ) {}

  uploadImage(
    selectedImage: any,
    postData: any,
    formStatus: string,
    id: string
  ) {
    const filePath = `postIMG/${Date.now()}`;
    // console.log(filePath);

    const storageRef = ref(this.storage, filePath);

    uploadBytesResumable(storageRef, selectedImage)
      .then(() => {
        getDownloadURL(storageRef).then((URL) => {
          postData.postImgPath = URL;
          // console.log(postData);
          if (formStatus == 'Edit') {
            this.updateData(id, postData);
          } else {
            this.saveData(postData);
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  saveData(postData: any) {
    const collectionItem = collection(this.firestore, 'posts');
    addDoc(collectionItem, postData)
      .then(() => {
        this.toastr.success('Data added successfully!!');
        this.router.navigate(['/posts']);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getData() {
    const collectionItem = collection(this.firestore, 'posts');

    return collectionData(collectionItem, { idField: 'id' });
  }

  async getOneData(id: any) {
    // const collectionItem = collection(this.firestore, 'posts');
    const docRef = doc(this.firestore, 'posts', id);
    const docSnap = await getDoc(docRef);
    // console.log(docSnap.data());
    return docSnap.data();
    // return collectionData(collectionItem);
  }

  updateData(id: string, postData: any) {
    const docItem = doc(this.firestore, 'posts', id);
    updateDoc(docItem, postData)
      .then(() => {
        this.toastr.success('Data Edited successfully!!');
        this.router.navigate(['/posts']);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  deleteImg(postImgPath: any, id: string) {
    const imgRef = ref(this.storage, postImgPath);
    deleteObject(imgRef).then(() => {
      this.deleteData(id);
    });
  }

  deleteData(id: string) {
    const docItem = doc(this.firestore, 'posts', id);
    deleteDoc(docItem)
      .then(() => {
        this.toastr.warning('Data Deleted successfully!!');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  markedFeatured(id: string, featuredData: any){
    const docItem = doc(this.firestore, 'posts', id);
    updateDoc(docItem, featuredData)
      .then(() => {
        this.toastr.info('Featured Status Updated!!');
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
