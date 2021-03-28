import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Params } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private httpClient: HttpClient) { }

  public getLocation(location: string): Promise<any> {
    const url = 'https://restapi.amap.com/v3/assistant/inputtips';
    const params: Params = new HttpParams().set('key', 'b22cfc7792ba67d194aacb5b54af63af').set('keywords', location);

    return this.httpClient.get(url, {params: params}).toPromise();
  }
}
