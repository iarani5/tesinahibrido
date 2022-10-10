import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

//photo
import { PhotoService } from '../services/photo.service';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    public photoService: PhotoService,
    private storage: Storage
  ) { }

  async ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
    await this.photoService.loadSaved();
    await this.storage.create();
  }

  addPhotoToGallery() {
    this.photoService.addNewToGallery();
  }

}
