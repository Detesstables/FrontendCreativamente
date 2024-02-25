import { productoModel } from "./producto.model";

export interface CategoriaModel {
    id_categoria: number;
    nombre_categoria: string;
    // Agrega más propiedades según tus necesidades
    producto: productoModel
  }