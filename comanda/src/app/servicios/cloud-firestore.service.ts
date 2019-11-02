import { Injectable } from '@angular/core';
import { AngularFirestore} from '@angular/fire/firestore';
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


}
