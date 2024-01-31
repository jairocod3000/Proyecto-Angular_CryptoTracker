import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AccesoAPIService {

  public cryptoList = new Array<any>();

  constructor(private http: HttpClient) {}

  getCryptoList(){
    this.http.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en")
    .subscribe((data:any) => {
      this.cryptoList = data;
    })
  }

  getCryptoData(id: string){
    return this.http.get("https://api.coingecko.com/api/v3/coins/" + id);
  }

  getHistoricalData(id: string){
    return this.http.get("https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=eur&days=maxy");
  }
}
