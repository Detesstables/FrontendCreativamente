import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { productoModel } from '../models/producto.model';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

/*   obtenerProductos(): Observable<productoModel[]> {
    return this.http.get<productoModel[]>(`${this.apiUrl}/producto`).pipe(
      map((productos: productoModel[]) => {
        return productos.map(producto => ({
          ...producto,
          nombre_categoria: producto.id_categoria ? producto.id_categoria.nombre_categoria : 'Sin categoría' // Verifica si id_categoria está definido
        }));
      })
    );
  } */
  
  obtenerProductos(): Observable<productoModel[]> {
    return this.http.get<productoModel[]>(`${this.apiUrl}/producto`);
  }


  crearProducto(producto: productoModel):Observable<productoModel>{
    return this.http.post<productoModel>(`${this.apiUrl}/producto`,producto)
  }
  

}
