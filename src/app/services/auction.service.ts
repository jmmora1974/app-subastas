import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';


import { Auction } from '../Models/auction';


@Injectable({
  providedIn: 'root'
})
export class AuctionService {

  private apiURL = "http://localhost:8000/api/auction/";

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });
    return headers;
  }

  // list of Auctions from Api Laravel
  getAll(): Observable<any[]> {
    const headers = this.getHeaders();
    return this.http.get<Auction[]>(this.apiURL, { headers }) ;
     /*return [{
       id: 1,
       name: 'Puja1',
       address: 'calle barcelona 10',
       country: 'España',
       description: 'Primera puja',
       sprice: 100,
       fprice: 111
     }, {
       id: 2,
       name: 'Puja2',
       address: 'calle barcelona 11',
       country: 'España',
       description: 'Segunda puja',
       sprice: 200,
       fprice: 222
     }
     ] as unknown as Observable<Auction[]>;*/
  }

  // create Auction
  create(auction:Auction): Observable<Auction> {
    const headers = this.getHeaders();
    return this.http.post<Auction>(this.apiURL, JSON.stringify(auction), {headers});
       
  }

  
  // find one Auction
  find(id:number): Observable<Auction> {
    const headers = this.getHeaders();
    const url = `${this.apiURL}${id}`;
    return this.http.get<Auction>(url, { headers });
  
  }

  // Delete Auction
  delete(id:number) {
    const headers = this.getHeaders();
    return this.http.delete<Auction>(this.apiURL + id , {headers});
  }

}
