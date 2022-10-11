import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

//photo
import { PhotoService } from '../services/photo.service';
import { Storage } from '@ionic/storage-angular';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;
  user: ProfileComponent;
  private todo: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    public photoService: PhotoService,
    public formBuilder: FormBuilder,
    private storage: Storage,
  ) {

    this.todo = this.formBuilder.group({
      situacion: ['', Validators.required],
      especie: ['', Validators.required],
      fotopath: [''],
      castrado: [''],
      raza: ['', Validators.required],
      comentarios: ['', Validators.required],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', Validators.required],
      celular: ['', Validators.required],

    });

  }

  logForm() {
    console.log(this.todo.value);
  }


  async ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
    await this.photoService.loadSaved();
    await this.storage.create();
  }

  addPhotoToGallery() {
    this.photoService.addNewToGallery();
  }

  /*
  onSubmit(): void {
    // Process checkout data here
    //this.user
   // this.items = this.cartService.clearCart();
    console.warn('Your order has been submitted', this.checkoutForm.value);
    this.checkoutForm.reset();
  }*/
   

}


export interface ProfileComponent {
  situacion: string;
  especies: string;
  fotopath: string;
  castreado: boolean;
  raza: string;
  comentarios: string;
  nombre: string;
  apellido: string;
  email: string;
  celular: number;
}

