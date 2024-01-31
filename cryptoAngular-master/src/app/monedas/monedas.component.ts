import { Component } from '@angular/core';
import { AccesoAPIService } from '../acceso-api.service';
import { AuthService } from '../auth.service';
import { FirebaseService } from '../firebase.service';


@Component({
  selector: 'app-monedas',
  templateUrl: './monedas.component.html',
  styleUrls: ['./monedas.component.css'],
})
export class MonedasComponent {
  page = 1;
  pageSize = 10;
  cryptoData = new Array<any>();

  intervalo = setInterval(() => {
    this.getDatosOfEachCrypto();
    // Voy a hacer que se actualice cada 2 minutos para evitar que la API me bloquee
    console.log("Actualizando datos de las criptomonedas");
  }, 120000);

  constructor(public datosAPI: AccesoAPIService, public auth: AuthService, public firebase: FirebaseService){}

  ngOnInit(){
    this.cryptoData = new Array<any>();
    this.datosAPI.getCryptoList();
    this.getDatosOfEachCrypto();
  }

  selectMoneda(moneda: any){
    this.firebase.addCrypto(moneda);
  }


  // Este método se encarga de obtener los datos de cada criptomoneda por una peticion a la API y meterlos en un array aparte
  getDatosOfEachCrypto(){
    this.firebase.datosAsociaciones.forEach((element) => {
      for(let i = 0; i < element.length; i++){
        this.datosAPI.getCryptoData(element[i].currencyID).subscribe((data:any) => {

          if(this.cryptoData.find((crypto:any) => crypto.id == data.id))
            return;
          this.cryptoData.push(data);
        })
      }
    });
  }
}
