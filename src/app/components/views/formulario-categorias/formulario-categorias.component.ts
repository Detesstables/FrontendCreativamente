import { Component } from '@angular/core';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { CategoriasService } from '../../../services/categorias.service';
import { HttpClientModule } from '@angular/common/http';
import { CategoriaModel } from '../../../models/categoria.model';


@Component({
  selector: 'app-formulario-categorias',
  standalone: true,
  imports: [NavbarComponent, HttpClientModule],
  templateUrl: './formulario-categorias.component.html',
  styleUrl: './formulario-categorias.component.css'
})
export class FormularioCategoriasComponent {

  categoriasLista: CategoriaModel[] = [] // Usa la interfaz Categoria

  constructor(private categoriaService: CategoriasService) {}
  
  ngOnInit(): void {
    this.obtenerCategorias();
  }


  /* METODO QUE NOS PERMITE OBTENER LAS CATEGORIAS PARA PODER LISTARLAS EN UNA TABLA */
   obtenerCategorias(){
    this.categoriaService.obtenerCategorias().subscribe((data: CategoriaModel[]) => {
      console.log(data)
      this.categoriasLista = data;
    })
  }





}