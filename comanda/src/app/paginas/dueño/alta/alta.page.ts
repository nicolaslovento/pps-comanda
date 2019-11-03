import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { CamaraService } from 'src/app/servicios/camara.service';
import { AlertControllerService } from 'src/app/servicios/alert-controller.service';
import { CloudFirestoreService } from 'src/app/servicios/cloud-firestore.service';
import { Router } from '@angular/router';
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

  constructor(
    private cameraService:CamaraService,
    private serviceFirestore:CloudFirestoreService,
    private alertService:AlertControllerService,
    private router:Router
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
   

    if(!this.verificarError()){

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
  }


  verificarError(){

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
  

  

}
