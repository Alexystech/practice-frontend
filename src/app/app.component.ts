import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from './service/user.service';

/**
 * Esta clase sera llamada desde el html para ejecutar los metodos 
 * desarrollados.
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  userForm!: FormGroup;
  users: any;
  title: any;

  constructor(
    public fb: FormBuilder,
    public userService: UserService
  ) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      clave: [''],
      numero: ['', Validators.required],
      correo: ['', Validators.required],
      nombre: ['', Validators.required]
    });

    this.userService.getAllUsers().subscribe(resp => {
      this.users = resp;
    }, 
      error => { console.error(error) }
    );

  }

  /**
   * Este metodo permite guardar un usuario nuevo.
   */
  guardar(): void {
    this.userService.createUser(this.userForm.value).subscribe(resp => {
      this.userForm.reset();
      this.users = this.users.filter( (user: { clave: any; }) => resp.clave !== user.clave);
      this.users.push(resp);
    }, 
      error => { console.error(error) }
    );
  }

  /**
   * Este metodo permite eliminar a un usuario.
   * @param usuario 
   */
  eliminar(usuario: any): void {
    this.userService.deleteUserByClave(usuario.clave).subscribe(resp => {
      if (resp === true) {
        this.users.pop(usuario);
      }
    });
  }

  /**
   * Este metodo permite actualizar un usuario.
   * @param usuario 
   */
  actualizar(usuario: any): void {
    this.userForm.setValue({
      clave: usuario.clave,
      numero: usuario.numero,
      correo: usuario.correo,
      nombre: usuario.nombre
    });
    
  }

}
