import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

//modal
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';

//photo
import { PhotoService } from '../services/photo.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Preferences, SetOptions, GetOptions, RemoveOptions } from '@capacitor/preferences';
import { async } from 'rxjs';

//bdd
// Import the functions you need from  
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc, getDocs } from "firebase/firestore"; 

const firebaseConfig = {
  apiKey: "AIzaSyAfjTL5pun-50H3KVGIryYVqnCD2jsA3Eg",
  authDomain: "tesina-hibrido.firebaseapp.com",
  projectId: "tesina-hibrido",
  storageBucket: "tesina-hibrido.appspot.com",
  messagingSenderId: "351697777940",
  appId: "1:351697777940:web:ea9eaf190024168c1efe01",
  measurementId: "G-0797821TNE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);


@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})

export class FolderPage implements OnInit {

  @ViewChild(IonModal) modal: IonModal;

  public user_data;
  public message;
  checkStatus: boolean;
  public folder: string;
 // user: ProfileComponent;
  private todo: FormGroup;
  public name = 'user_pet' + Date.now();
  private savedImageFile;


  constructor(
    private activatedRoute: ActivatedRoute,
    public photoService: PhotoService,
    public formBuilder: FormBuilder,
  ) {

    this.checkStatus = false;

    this.todo = this.formBuilder.group({
      situacion: ['', Validators.required],
      especie: ['', Validators.required],
      castrado: [''],
      raza: ['', Validators.required],
      comentarios: ['', Validators.required],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', Validators.required],
      celular: ['', Validators.required],

    });

    this.todo.value.castrado = true;

  }

  

  async logForm() {

    //await this.storage.set('user_pet_pics', this.photoService);
    /*console.log(this.photoService);

    if (this.savedImageFile != undefined) {

    }*/
   
    try {

      const docRef = await addDoc(collection(db, this.name), {
        situacion: this.todo.value.situacion,
        especie: this.todo.value.especie,
        castrado: this.todo.value.castrado,
        raza: this.todo.value.raza,
        comentarios: this.todo.value.comentarios,
        nombre: this.todo.value.nombre,
        apellido: this.todo.value.apellido,
        email: this.todo.value.email,
        celular: this.todo.value.celular,
        foto: this.savedImageFile

      });

      this.save();

    } catch (e) {
      console.error("Error adding document: ", e);
    }

   

  }


  async save() {

    const querySnapshot = await getDocs(collection(db, this.name));
    querySnapshot.forEach((doc) => {

      if (doc.data()) {
        this.checkStatus = true;
        this.message = doc.data();

        if (this.message.castrado || this.message.castrado == "") {
          this.message.castrado = "Si";
        }
        else {
          this.message.castrado = "No";
        }

        switch (this.message.situacion) {
          case "en_adopcion":
            this.message.situacion = "en adopción";
            break;
          case "en_transito":
            this.message.situacion = "en transito";
            break;
        }

        this.message.apellido = this.message.apellido.charAt(0).toUpperCase() + this.message.apellido.slice(1); 
        this.message.nombre = this.message.nombre.charAt(0).toUpperCase() + this.message.nombre.slice(1); 
        this.message.raza = this.message.raza.charAt(0).toUpperCase() + this.message.raza.slice(1); 
      }

      });

  }

  async ngOnInit() { 
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
    await this.photoService.loadSaved(this.name); // key for user photos
  }

  async addPhotoToGallery() {
    this.savedImageFile = await this.photoService.addNewToGallery(); //aca esta la ruta y el nombre de las fotos
  }

  /*
  onSubmit(): void {
    // Process checkout data here
    //this.user
   // this.items = this.cartService.clearCart();
    console.warn('Your order has been submitted', this.checkoutForm.value);
    this.checkoutForm.reset();
  }*/



  //***** MODAL CONTROLLER *****//

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  goBack() {
    this.todo.reset();
    this.savedImageFile = this.photoService.emptyPicture();
    this.checkStatus = false;
  }
  /*onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `Hello, ${ev.detail.data}!`;
    }
  }*/
}


export interface ProfileComponent {
  situacion: string;
  especies: string;
  castreado: boolean;
  raza: string;
  comentarios: string;
  nombre: string;
  apellido: string;
  email: string;
  celular: number;
}


function setObject() {
    throw new Error('Function not implemented.');
}
