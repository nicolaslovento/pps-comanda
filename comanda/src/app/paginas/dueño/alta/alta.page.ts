import { Component, OnInit } from '@angular/core';

import { CamaraService } from 'src/app/servicios/camara.service';
import { AlertControllerService } from 'src/app/servicios/alert-controller.service';
import { CloudFirestoreService } from 'src/app/servicios/cloud-firestore.service';
import { Router } from '@angular/router';
import { ScannerService } from 'src/app/servicios/scanner.service';
@Component({
  selector: 'app-alta',
  templateUrl: './alta.page.html',
  styleUrls: ['./alta.page.scss'],
})
export class AltaPage implements OnInit {
  nombre:string="";
  apellido:string="";
  dni="";
  cuil="";
  foto:any="";
  perfil:string="";
  clave:string="";
  error:string="";
  opcion:string='dueño/supervisor';
  numeroMesa=0;
  comensales=0;
  numeroPedido=0;

  constructor(
    private cameraService:CamaraService,
    private serviceFirestore:CloudFirestoreService,
    private alertService:AlertControllerService,
    private router:Router,
    private scannerService:ScannerService
  ){}

  ngOnInit() {
 
  }

  

  tomarFoto(){
    let  usuarioActual=JSON.parse(localStorage.getItem('usuario'));
    let nombreFoto=usuarioActual.dni+"-"+(new Date()).getTime();
    this.cameraService.tomarFoto(nombreFoto).then(fotoSacada=>{
      this.foto=fotoSacada;
    });
    
  }

  darDeAlta(){
   
    if(this.opcion=='dueño/supervisor'){

      if(!this.verificarErrorDueñoOSupervisor()){

        let usuarioNuevo={
          nombre:this.nombre,
          apellido:this.apellido,
          dni:this.dni.toString(),
          cuil:this.cuil.toString(),
          foto:this.foto,
          perfil:this.perfil,
          clave:this.clave
        }
        this.serviceFirestore.cargarDueñoOSupervisor(usuarioNuevo).then(()=>{
          this.alertService.alertBienvenida("Cargando usuario..",2000).then(()=>{
            this.limpiarForm();
            this.irAtras();
          });
        }).catch((error)=>{
          this.alertService.alertError(error);
          console.log(error);
        });
      }
    }else if(this.opcion=="empleado"){
      //si es empleado,no verifica la foto
      if(!this.verificarErrorEmpleado()){

        let usuarioNuevo={
          nombre:this.nombre,
          apellido:this.apellido,
          dni:this.dni.toString(),
          cuil:this.cuil.toString(),
          foto:null,
          perfil:this.perfil,
          clave:this.clave
        }
        
        this.serviceFirestore.cargarDueñoOSupervisor(usuarioNuevo).then(()=>{
          this.alertService.alertBienvenida("Cargando usuario..",2000).then(()=>{
            this.limpiarForm();
            this.irAtras();
          });
        }).catch((error)=>{
          this.alertService.alertError(error);
          console.log(error);
        });
      }
    }
    else{
      if(!this.verificarErrorMesa()){

        let mesaNueva={
          numeroMesa:this.numeroMesa,
          comensales:this.comensales,
          foto:this.foto,
          codigo:this.numeroMesa+"ABC",
          numeroPedido:this.numeroPedido,
        }
        this.serviceFirestore.cargarMesa(mesaNueva).then(()=>{
          this.alertService.alertBienvenida("Cargando mesa..",2000).then(()=>{
            this.limpiarForm();
            this.irAtras();
          });
        }).catch((error)=>{
          this.alertService.alertError(error);
          console.log(error);
        });
      }
    }
  }

  verificarErrorEmpleado(){

    let errores=0;
    if(this.nombre==""){
      this.error="El nombre no puede estar vacío.";
      errores++;
    }
    if(this.apellido==""){

      this.error="El apellido no puede estar vacío.";
      errores++;
    }

    if(this.perfil==""){

      this.error="Debe seleccionar un perfil.";
      errores++;
     
    }

    if(this.dni.length<6){

      this.error="El dni debe tener al menos 6 dígitos.";
      errores++;
     
    }

    if(this.cuil.length<6){

      this.error="El cuil debe tener al menos 6 dígitos.";
      errores++;
      
    }

    if(this.foto==""){

      this.foto="";
      
    }

    
    if(this.clave.length<0){

      this.error="La clave debe tener al menos 4 dígitos.";
      errores++;
      
    }

    if(errores==1){
      this.alertService.alertError(this.error);
      return true;
    }
    if(errores>1){
      this.alertService.alertError("No puede haber campos vacíos.");
      return true
    }

  }


  verificarErrorDueñoOSupervisor(){

    let errores=0;
    if(this.nombre==""){
      this.error="El nombre no puede estar vacío.";
      errores++;
    }
    if(this.apellido==""){

      this.error="El apellido no puede estar vacío.";
      errores++;
    }

    if(this.perfil==""){

      this.error="Debe seleccionar un perfil.";
      errores++;
     
    }

    if(this.dni.length<6){

      this.error="El dni debe tener al menos 6 dígitos.";
      errores++;
     
    }

    if(this.cuil.length<6){

      this.error="El cuil debe tener al menos 6 dígitos.";
      errores++;
      
    }

    if(this.foto==""){

      this.error="Debe tomarse una foto.";
      errores++;
      
    }

    
    if(this.clave.length<0){

      this.error="La clave debe tener al menos 4 dígitos.";
      errores++;
      
    }

    if(errores==1){
      this.alertService.alertError(this.error);
      return true;
    }
    if(errores>1){
      this.alertService.alertError("No puede haber campos vacíos.");
      return true
    }

  }

  verificarErrorMesa(){

    let errores=0;
    if(this.numeroMesa<0){
      this.error="El número de mesa no puede estar vacío.";
      errores++;
    }
    if(this.comensales<0){

      this.error="Debe haber al menos 1 comensal.";
      errores++;
    }

    if(this.foto==""){

      this.error="Debe tomarse una foto.";
      errores++;
      
    }

    if(errores==1){
      this.alertService.alertError(this.error);
      return true;
    }
    if(errores>1){
      this.alertService.alertError("No puede haber campos vacíos.");
      return true
    }

  }

  cerrarSesion(){
    localStorage.clear();
    this.router.navigateByUrl('home');
  }

  irAtras(){
    this.limpiarForm();
    this.router.navigateByUrl('menu-dueño');
  }

  limpiarForm(){
    this.nombre="";
    this.apellido="";
    this.dni="";
    this.cuil="";
    this.perfil="";
    this.foto="";
    this.clave="";
  }

  leerDniConQr(){

    this.scannerService.iniciarScanner().then((codigoQR:any)=>{
      alert(codigoQR);
      this.dni=codigoQR;
    }).catch((error)=>{
      this.alertService.alertError("No se pudo leer el codigo QR");
    });
  }
  

  

}
