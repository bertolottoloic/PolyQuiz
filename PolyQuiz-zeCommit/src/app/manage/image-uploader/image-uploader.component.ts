import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {NgxImageCompressService} from 'ngx-image-compress';
import * as _ from 'lodash';

@Component({
  selector: 'app-image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.css']
})
export class ImageUploaderComponent implements OnInit {
  imageError: string;
  file: any;
  localUrl: any;
  localCompressedURl:any;
  isImageSaved: boolean;
  sizeOfOriginalImage:number;
  sizeOFCompressedImage:number;
  @Output() cardImageBase64Event = new EventEmitter<string>();

  constructor(private imageCompress:NgxImageCompressService) { }


  ngOnInit() {
  }

  fileChangeEvent(fileInput: any) {
    var  fileName : any;
    this.file = fileInput.target.files[0];
    fileName = this.file['name'];
    this.imageError = null;
    if (fileInput.target.files && fileInput.target.files[0]) {
        // Size Filter Bytes
        const max_size = 20971520;
        const allowed_types = ['image/png', 'image/jpeg'];
        const max_height = 15200;
        const max_width = 25600;

        if (fileInput.target.files[0].size > max_size) {
            this.imageError =
                'Maximum size allowed is ' + max_size / 1000 + 'Mb';

            return false;
        }

        if (!_.includes(allowed_types, fileInput.target.files[0].type)) {
            this.imageError = 'Only Images are allowed ( JPG | PNG )';
            return false;
        }
        const reader = new FileReader();
        reader.onload = (e: any) => {
            const image = new Image();
            this.localUrl = e.target.result;
            this.compressFile(this.localUrl,fileName);
            this.isImageSaved = true;
        };
        reader.readAsDataURL(fileInput.target.files[0]);
    }
  }

  imgResultBeforeCompress:string;
  imgResultAfterCompress:string;
  compressFile(image,fileName) {
    var orientation = -1;
    this.sizeOfOriginalImage = this.imageCompress.byteCount(image)/(1024*1024);
    console.warn('Size in bytes is now:',  this.sizeOfOriginalImage);

    this.imageCompress.compressFile(image, orientation, 40, 50).then(
    result => {
      this.imgResultAfterCompress = result;
      this.localCompressedURl = result;
      this.cardImageBase64Event.emit(result);
      this.sizeOFCompressedImage = this.imageCompress.byteCount(result)/(1024*1024)
      console.warn('Size in bytes after compression:',  this.sizeOFCompressedImage);// create file from byte
      const imageName = fileName;// call method that creates a blob from dataUri
      const imageBlob = this.dataURItoBlob(this.imgResultAfterCompress.split(',')[1]);//imageFile created below is the new compressed file which can be send to API in form dataconst imageFile = new File([result], imageName, { type: 'image/jpeg' });
      
    });
    
  }

  dataURItoBlob(dataURI) {
  const byteString = window.atob(dataURI);
  const arrayBuffer = new ArrayBuffer(byteString.length);
  const int8Array = new Uint8Array(arrayBuffer);for (let i = 0; i < byteString.length; i++) {
  int8Array[i] = byteString.charCodeAt(i);
  }
  
  const blob = new Blob([int8Array], { type: 'image/jpeg' });
    return blob;
  }

}
