import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { CloudFirestoreService } from '../servicios/cloud-firestore.service';
import { AlertControllerService } from '../servicios/alert-controller.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  correo="";
  clave="";
  error="";

  ngOnInit() {
    
    
  }

  constructor(

    private dbFirestore:CloudFirestoreService,
    private alertService:AlertControllerService,
    private router:Router

  ) 
  {}

  
/*Verifica que los datos ingresados estén correctos*/
  verificarError(){

    if(this.correo=="" && this.clave==""){
      this.error="El correo y la clave no pueden estar vacíos.";
      this.alertService.alertError(this.error);
      
      return true;
    }
    if(this.correo==""){
      this.error="El correo no puede estar vacío.";
      this.alertService.alertError(this.error);
     
      return true;
    }
    if(this.correo.indexOf('@')<0){
      this.error="El correo debe tener un formato válido.";
      this.alertService.alertError(this.error);
     
      return true;
    }
    if(this.clave==""){
      this.error="La clave no puede estar vacía.";
      this.alertService.alertError(this.error);
      
      
      return true;
    }
    if(this.clave.length<4){
      this.error="La clave debe tener al menos 4 caracteres.";
      this.alertService.alertError(this.error);
      
     
      return true;
    }
  }


/*carga de usuarios a través de botones*/
  cargarUsuario(eleccion:number){
    switch(eleccion){
        case 1:
          this.correo="supervisor@supervisor.com";
          this.clave="1111";
        break;
        case 2:
          this.correo="dueño@dueño.com";
          this.clave="2222";
        break;
        case 3:
          this.correo="cocinero@empleado.com";
          this.clave="3333";
            
        break;
        case 4:
            this.correo="mozo@empleado.com";
            this.clave="4444";
        break;
        case 5:
            this.correo="bartender@empleado.com";
            this.clave="5555";
        break;
        case 6:
            this.correo="registrado@cliente.com";
            this.clave="6666";
        break;
        case 7:
            this.correo="anonimo@cliente.com";
            this.clave="7777";
        break;
        
    }
  }
    

  
/*Verifica que los datos estén correctos y luego verifica que el usuario esté en la BD*/
  login(){
    
    if(!this.verificarError()){

      this.dbFirestore.verificarUsuario(this.correo,this.clave).then((data)=>{
        console.log(data);
        this.alertService.alertBienvenida("Bienvenido",4000).then(()=>alert("sad"));//aca hay que redireccionar a la pagina del usuario
        //falta ver cómo se va a guardar el usuario en la app.
      }).catch((error)=>{
        this.alertService.alertError(error);
      })
    }

    
  }

  

}
