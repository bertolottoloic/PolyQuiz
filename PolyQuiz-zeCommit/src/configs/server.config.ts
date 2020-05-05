import {HttpHeaders} from '@angular/common/http';

export const httpOptionsBase = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

export const serverUrlApi = 'http://localhost:9428/api';
export const serverUrlAssets = 'http://localhost:9428/assets'