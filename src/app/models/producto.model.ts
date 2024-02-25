import { CategoriaModel } from "./categoria.model";

export interface productoModel {
    
    id_producto: number;
    nombre_producto: string;
    precio: number;
    imagen: Blob;
    stock: number;
    nombre_categoria: string; // Nombre de la categoría asociada al producto
    categoria: CategoriaModel

  }