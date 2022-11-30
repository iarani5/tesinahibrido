import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

//photo
import { PhotoService } from '../services/photo.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Preferences, SetOptions, GetOptions, RemoveOptions } from '@capacitor/preferences';


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
  ) {

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

  }

  

  async logForm() {

    //console.log(this.photoService);
    const name = 'user_pet' + Date.now();

    let options: SetOptions = {
      key: name,
      value: JSON.stringify(this.todo.value)
    };

    Preferences.set(options);

    /*const setName = async () => {
      await Preferences.set({
        key: name,
        value: this.todo.value,
      });
    };*/

    //const rta = await Preferences.get({ key: name });

    console.log("RTAAAAA ------------------");

    /*const checkName = async () => {
      //const { value } = await Preferences.get({ key: name });
      //console.log(`${value}`);

      const rta = await Preferences.get({ key: name });
      console.log(rta);
    };*/


    //this.todo.value
    //var name = 'user_pet' + Date.now();
    //await this.storage.set('user_pet_pics', this.photoService);

    this.saved(name);
  }

  async saved(name) {
    const rta = await Preferences.get({ key: name });
    const user_data = JSON.parse(rta.value);
    console.log(user_data.situacion);

  }

  async ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
    await this.photoService.loadSaved();
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
  castreado: boolean;
  raza: string;
  comentarios: string;
  nombre: string;
  apellido: string;
  email: string;
  celular: number;
}

