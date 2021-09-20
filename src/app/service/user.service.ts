import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ThrowStmt } from '@angular/compiler';

/**
 * Esta clase se encarga de conectarse y 
 * proveer los metodos desarrollados en el API REST
 */
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private base_url = 'http://localhost:8083/slasher/api/user';

  constructor(
    private http: HttpClient
  ) { }

  /**
   * retorna todos los usuarios registrados
   * @returns 
   */
  public getAllUsers(): Observable<any> {
    return this.http.get(this.base_url + "/get/all");
  }

  /**
   * registra un nuevo usuario
   * @param usuario 
   * @returns 
   */
  public createUser(usuario: any): Observable<any> {
    return this.http.post(this.base_url + "/create", usuario);
  }

  /**
   * Elimina un usuario por clave
   * @param clave 
   * @returns 
   */
  public deleteUserByClave(clave: any): Observable<any> {
    return this.http.delete(this.base_url + "/delete/" + clave);
  }

  /**
   * Actualiza un usuario
   * @param usuario 
   * @returns 
   */
  public updateUser(usuario: any): Observable<any> {
    return this.http.put(this.base_url + "/update", usuario);
  }
  
}
