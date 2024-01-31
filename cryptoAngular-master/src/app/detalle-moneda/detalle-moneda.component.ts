import { Component, AfterViewInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccesoAPIService } from '../acceso-api.service';

@Component({
  selector: 'app-detalle-moneda',
  templateUrl: './detalle-moneda.component.html',
  styleUrls: ['./detalle-moneda.component.css']
})
export class DetalleMonedaComponent implements AfterViewInit{
  id: any;
  coinData: any
  dataPoints: any = []
  chartOptions:any;
  chart: any;
  dataForPoints: any;

  constructor(private route: ActivatedRoute, public datosAPI: AccesoAPIService) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.datosAPI.getCryptoData(this.id).subscribe((data: {}) => {
      this.coinData = data;
    });


    // Configuracion del grafico
    this.chartOptions = {
      theme: "dark2",
      zoomEnabled: true,
      backgroundColor: "#0C0E12",
      title: {
        text:"",
        fontColor: "#F2BC07",
        margin: 40,
      },
      subtitles: [{
        text: "Loading Data...",
        fontColor: "#F2BC07",
        fontSize: 24,
        horizontalAlign: "center",
        verticalAlign: "center",
        dockInsidePlotArea: true
      }],
      axisY: {
        title: "Historical price (in EUR)",
        titleFontColor: "#F2BC07",
        titleFOntSize: 24,
        suffix: "€"
      },
      data: [{
        lineColor: "#F2BC07",
        markerColor: "#F2BC07",
        markerSize: 2,
        type: "line",
        name: "Closing Price",
        yValueFormatString: "€#,###.00",
        dataPoints: this.dataPoints
      }]
    }
  }

  getChartInstance(chart: object) {
    this.chart = chart;
  }

  // Renderizamos el grafico una vez que se ha cargado la informacion de la moneda (el historico de precios)
  ngAfterViewInit() {
    this.chartOptions.subtitles[0].text = "";
    this.chartOptions.title.text = this.coinData.name + " Historical Price";
    this.chartOptions.data.name = this.coinData.name + " Historical Price";
    this.datosAPI.getHistoricalData(this.id).subscribe((data: {}) => {
      this.dataForPoints = data;
      for (let i = 0; i < this.dataForPoints.prices.length; i++) {
        this.dataPoints.push({
          x: new Date(this.dataForPoints.prices[i][0]),
          y: this.dataForPoints.prices[i][1]
        });
      }
    this.chart.render();
    });
  }

  // El metodo getPriceWithPercentageChange devuelve el precio actual de la moneda + el porcentaje de cambio que le pasemos como parametro

  getPriceWithPercentageChange(percentage:number) {
    return this.coinData.market_data.current_price.eur + (this.coinData.market_data.current_price.eur * percentage / 100);
  }
}
