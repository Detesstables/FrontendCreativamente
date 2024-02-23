import { Component } from '@angular/core';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { CategoriaModel } from '../../../models/categoria.model';
import { CategoriasService } from '../../../services/categorias.service';
import { productoModel } from '../../../models/producto.model';
import { ProductosService } from '../../../services/productos.service';

@Component({
  selector: 'app-formulario-productos',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './formulario-productos.component.html',
  styleUrl: './formulario-productos.component.css'
})
export class FormularioProductosComponent {

  /* Array donde se almacenan los datos para luego mostrarlos en el front */
  productosLista: productoModel[] = []
  categoriasLista: CategoriaModel[] = []

  constructor(private categoriaService: CategoriasService, private productoService: ProductosService){}


  ngOnInit(): void {
    this.obtenerCategorias();
    this.obtenerProductos();
  }

    /* METODO QUE NOS PERMITE OBTENER LAS CATEGORIAS PARA PODER LISTARLAS EN UN COMBOBOX */
    obtenerCategorias(){
      this.categoriaService.obtenerCategorias().subscribe((data: CategoriaModel[]) => {
        console.log(data)
        this.categoriasLista = data;
      })
    }

    obtenerProductos(){
      this.productoService.obtenerProductos().subscribe((data: productoModel[])=> {
        console.log(data)
        this.productosLista = data;
      })
    }

}
