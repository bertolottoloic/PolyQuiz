import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import { serverUrlApi, serverUrlAssets} from '../../configs/server.config';

@Injectable({
    providedIn: 'root'
})

export class UploadService{
    
    constructor(private http: HttpClient){

    }

    addPicture(img: FormData){
        return this.http.post<string>(serverUrlApi+'/image-upload', img);
    }

    deletePicture(img: string){
        console.log("service", img);
        let line = img.split('/');
        this.http.delete(serverUrlApi + '/image-upload/' + line[line.length-1] ).subscribe(()=> console.log('Picture deleted!'));
    }
}

