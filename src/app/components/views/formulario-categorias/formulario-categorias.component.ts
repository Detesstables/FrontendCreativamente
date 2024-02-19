import { Component } from '@angular/core';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { CategoriasService } from '../../../services/categorias.service';
import { HttpClientModule } from '@angular/common/http';
import { CategoriaModel } from '../../../models/categoria.model';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-formulario-categorias',
  standalone: true,
  imports: [NavbarComponent, HttpClientModule, ReactiveFormsModule],
  templateUrl: './formulario-categorias.component.html',
  styleUrl: './formulario-categorias.component.css'
})
export class FormularioCategoriasComponent {

  formularioCategoria: FormGroup

  categoriasLista: CategoriaModel[] = [] // Usa la interfaz Categoria


  constructor(private categoriaService: CategoriasService, private form: FormBuilder) {
    this.formularioCategoria = this.form.group({
      nombre_categoria: ['', Validators. required]
    })
  }
  
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

  crearCategoria() {
    if (this.formularioCategoria.valid) {
      const nuevaCategoria: CategoriaModel = this.formularioCategoria.value;
      // Llama al servicio para crear la categoría
      this.categoriaService.crearCategoria(nuevaCategoria).subscribe(
        (response) => {
          console.log('Categoría creada:', response);
          // Actualiza la lista de categorías si es necesario
        },
        (error) => {
          console.error('Error al crear la categoría:', error);
        }
      );
    }
  }
}