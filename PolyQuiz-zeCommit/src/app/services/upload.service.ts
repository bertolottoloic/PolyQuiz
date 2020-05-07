import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { serverUrlApi } from '../../configs/server.config';

@Injectable({
    providedIn: 'root'
})

export class UploadService{
    
    constructor(private http: HttpClient){

    }

    addPicture(img: FormData){
        return this.http.post<string>(serverUrlApi+'/image-upload', img);
    }
    
}

