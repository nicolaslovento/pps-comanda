import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

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
    
    localStorage.clear();
    
    //this.traerMisFotos();
  }
  constructor(private router:Router,public alertController: AlertController) {}

  async presentAlert(error:string,accion:boolean) {
    var alert;
    if(accion){
      alert = await this.alertController.create({

      
        mode:"md",
        message: '<b align=center>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Bienvenido</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<ion-spinner name="bubbles"></ion-spinner>'
        
        
      });
    }else{
      alert = await this.alertController.create({

      
        mode:"md",
        message: '<b align=center>'+error+'</b>',
        buttons: ['Cerrar']
        
      });
    }  
    
    
    await alert.present();
  }

  verificarError(){

    if(this.correo=="" && this.clave==""){
      this.error="El correo y la clave no pueden estar vacíos.";
      this.presentAlert(this.error,false);
      
      
      
      return true;
    }
    if(this.correo==""){
      this.error="El correo no puede estar vacío.";
      this.presentAlert(this.error,false);
     
      return true;
    }
    if(this.correo.indexOf('@')<0){
      this.error="El correo debe tener un formato válido.";
      this.presentAlert(this.error,false);
     
      return true;
    }
    if(this.clave==""){
      this.error="La clave no puede estar vacía.";
      this.presentAlert(this.error,false);
      
      
      return true;
    }
    if(this.clave.length<4){
      this.error="La clave debe tener al menos 4 caracteres.";
      this.presentAlert(this.error,false);
      
     
      return true;
    }
  }

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
          this.correo="mozo@empleado.com";
        this.clave="3333";
            
        break;
        case 4:
            this.correo="cocinero@empleado.com";
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
    

  

  /*login(){
    localStorage.clear();
    
    this.dbService.verificarUsuario().subscribe((data)=>{
      data.forEach(user=>{
        if(user.data().clave==this.clave && user.data().correo==this.correo){
          localStorage.setItem('user',JSON.stringify(user.data()));
          this.timerAlert();
        }
      });
    
     })
  }

  timerAlert(){
    
     this.presentAlert("bienvenido",true);
     setTimeout(()=>{
       this.alertController.dismiss().then(()=>{
        this.router.navigate(['menu']);
       });
     },2500);
    
  }*/

}
