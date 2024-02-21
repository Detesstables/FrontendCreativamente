import { HttpClient, } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoriaModel } from '../models/categoria.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  obtenerCategorias(): Observable<CategoriaModel[]> {
    return this.http.get<CategoriaModel[]>(`${this.apiUrl}/categoria`);
  }

  crearCategoria(categoria:CategoriaModel): Observable<CategoriaModel>{
    return this.http.post<CategoriaModel>(`${this.apiUrl}/categoria/create`,categoria)
  }

  eliminarCategoria(id: number): Observable<CategoriaModel> {
    return this.http.delete<CategoriaModel>(`${this.apiUrl}/categoria/${id}`);
  }

  actualizarCategoria(id: number, nuevaCategoriaData: Partial<CategoriaModel>): Observable<CategoriaModel> {
    //TAMBIEN SE PUEDE HACER DE ESTA FORMA DECLARANDO LA URL EN UNA VARIABLE 
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<CategoriaModel>(url, nuevaCategoriaData);
  }

  }
