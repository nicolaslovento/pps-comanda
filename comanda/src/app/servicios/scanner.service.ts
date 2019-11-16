import { Injectable } from '@angular/core';
/*import { ZBar, ZBarOptions } from '@ionic-native/zbar/ngx';*/
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner/ngx';

@Injectable({
  providedIn: 'root'
})
export class ScannerService {

  scannedData: {};
  constructor(private barcodeScanner:BarcodeScanner) { }

  /*iniciarScanner(){
    var options: ZBarOptions = {
      flash: 'off',
      drawSight: false
    };
    return new Promise((resolve,reject)=>{
      this.scanQr.scan(options).then((codigoQR)=>{
       resolve(codigoQR);
    }).catch((error)=>{
      reject(error);
    })
  })

  }*/

  iniciarScanner(){
    return new Promise((resolve,reject)=>{
      this.barcodeScanner.scan({prompt: "Enfoque el código de barras del DNI", formats: "PDF_417"}).then((result)=>{
       resolve(result);
    }).catch((error)=>{
      reject(error);
    })
  })

  }

}
