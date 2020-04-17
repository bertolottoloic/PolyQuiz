import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import {NgxImageCompressService} from 'ngx-image-compress';
import * as _ from 'lodash';
import { BehaviorSubject } from 'rxjs';
import { min } from 'rxjs/operators';

@Component({
  selector: 'app-image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.css']
})
export class ImageUploaderComponent implements OnInit {
  imgBefore: HTMLImageElement = new Image();


  constructor(private imageCompress: NgxImageCompressService) {
  }
  emptyLoaderUrl = './../../../assets/placeholder.png';
  localCompressedURl: any;
  isImageSaved: boolean;
  @Output() cardImageBase64Event = new EventEmitter<string>();
  @Input() imageLoad: string;


  ngOnInit() {
  }

  compressFile() {

    this.imageCompress.uploadFile().then(({image, orientation}) => {
      const img = new Image();
      img.src = image;
      console.warn('Size in bytes was:', this.imageCompress.byteCount(img.src));
      let width: number;
      let height: number;
      img.addEventListener('load', () => {
        width = img.width;
        height = img.height;
        const ratioW = ((500 / width) !== Infinity) ? (500 / width) * 100 : 100;
        const ratioH = ((300 / height) !== Infinity) ? (300 / height) * 100 : 100;
        console.log(ratioW, ratioH);
        const ratio = Math.min(ratioH, ratioW);
        console.log(ratio);
        this.imageCompress.compressFile(img.src, orientation, ratio, 50).then(
          result => {
            console.log(result);
            this.localCompressedURl = result;
            this.cardImageBase64Event.emit(result);

            console.warn('Size in bytes is now:', this.imageCompress.byteCount(result));
          }
        );
        this.isImageSaved = true;
      });
    });

  }

}
