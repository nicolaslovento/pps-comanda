import { Injectable } from '@angular/core';
import { AngularFirestore} from '@angular/fire/firestore';
import { reject } from 'q';
import { resolve } from 'url';
@Injectable({
  providedIn: 'root'
})
export class CloudFirestoreService {

  constructor(private dbFirestore:AngularFirestore) { }

  /*
  Verifica que el usuario exista
  */
  verificarUsuario(correo:string,clave:String){
    return new Promise((resolve,rejected)=>{

      this.dbFirestore.collection('usuarios').doc(correo).valueChanges().subscribe((user:any)=>{
        if(user){

          if(user.clave==clave){
            resolve(user);
          }else{
            rejected("Error: La contraseña es incorrecta");
          }
        }else{
          rejected("Error: El usuario no existe");
        }
        
      });

    })
  }

  

/*carga un dueño o supervisor a la bd, su id será el dni->(también lo tienen los clientes y empleados)*/  
cargarDueñoOSupervisor(usuarioNuevo:any){

    return new Promise((resolve,rejected)=>{

      this.dbFirestore.collection("usuarios").doc(usuarioNuevo.dni.toString()).set({
      
      nombre:usuarioNuevo.nombre,
      apellido:usuarioNuevo.apellido,
      dni:usuarioNuevo.dni,
      cuil:usuarioNuevo.cuil,
      foto:usuarioNuevo.foto,
      perfil:usuarioNuevo.perfil,

    }).then(()=>{
      resolve(usuarioNuevo);
    }).catch((error)=>{
      rejected(error);
    });
  })
}


  


}
