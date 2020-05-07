import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgxImageCompressService} from 'ngx-image-compress';
import { HttpClient } from '@angular/common/http';
import {httpOptionsBase, serverUrlApi} from '../../../configs/server.config';

@Component({
  selector: 'app-image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.css']
})
export class ImageUploaderComponent implements OnInit {
  httpOtpions = httpOptionsBase;
  serverUrl = serverUrlApi;
  emptyLoaderUrl = './../../../assets/placeholder.png';
  localCompressedURl: any;
  isImageSaved: boolean;
  @Output() imageBase64Event = new EventEmitter<FormData>();
  @Input() imageLoad: string;

  constructor(private imageCompress: NgxImageCompressService, private http: HttpClient) {
  }

  ngOnInit() {
  }

  compressFile() {
    this.imageCompress.uploadFile().then(({image, orientation}) => {
      const img = new Image();
      img.src = image;
      let width: number;
      let height: number;
      img.addEventListener('load', () => {
        width = img.width;
        height = img.height;
        const ratioW = ((500 / width) !== Infinity) ? (500 / width) * 100 : 100;
        const ratioH = ((300 / height) !== Infinity) ? (300 / height) * 100 : 100;
        const ratio = Math.min(ratioH, ratioW);
        this.imageCompress.compressFile(img.src, orientation, ratio, 60).then(
          result => {
            this.localCompressedURl = result;
            let fd = new FormData();
            let imgBlob = this.dataURItoBlob(result);
            fd.append('photo', imgBlob);
            this.imageBase64Event.emit(fd);
          }
        );
        this.isImageSaved = true;
      });
    });
  }

  dataURItoBlob(dataURI) {
    
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(dataURI.split(',')[1]);
    else
        byteString = unescape(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], {type:mimeString});

  }
}
