import { Component } from '@angular/core';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { CategoriasService } from '../../../services/categorias.service';
import { HttpClientModule } from '@angular/common/http';
import { CategoriaModel } from '../../../models/categoria.model';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-formulario-categorias',
  standalone: true,
  imports: [NavbarComponent, HttpClientModule, ReactiveFormsModule],
  templateUrl: './formulario-categorias.component.html',
  styleUrl: './formulario-categorias.component.css'
})
export class FormularioCategoriasComponent {
  
  categoriaActual: CategoriaModel = {} as CategoriaModel;

  formularioCategoria: FormGroup

  categoriasLista: CategoriaModel[] = [] // Usa la interfaz Categoria


  constructor(private categoriaService: CategoriasService, private form: FormBuilder, private router: Router) {
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
          this.obtenerCategorias();
          this.formularioCategoria.reset();
        },
        (error) => {
          console.error('Error al crear la categoría:', error);
        }
      );
    }
  }


  eliminarCategoria(id:number){
    this.categoriaService.eliminarCategoria(id).subscribe(
      () =>{
        console.log('categoria eliminada correctamente')
        this.obtenerCategorias();
      },
      (error) => {
        console.log(error)
      }
    )
  }



  actualizarCategoria(id: number, nuevaCategoriaData: Partial<CategoriaModel>) {
    this.categoriaService.actualizarCategoria(id, nuevaCategoriaData).subscribe(
      categoriaActualizada => {
        console.log('Categoría actualizada:', categoriaActualizada);
        // Realizar cualquier acción adicional que necesites después de la actualización
        this.obtenerCategorias();
      },
      error => {
        console.error('Error al actualizar categoría:', error);
      }
    );
  }


  abrirModalEditar(categoria: CategoriaModel) {
    this.categoriaActual = categoria;
    this.formularioCategoria.patchValue({
      nombre_categoria: categoria.nombre_categoria
    });
  }
  
  guardarCambios() {
    const idCategoria = this.categoriaActual.id_categoria; // Asegúrate de tener el nombre correcto del campo ID
    const nuevaCategoriaData = this.formularioCategoria.value;
    this.categoriaService.actualizarCategoria(idCategoria, nuevaCategoriaData).subscribe(
      categoriaActualizada => {
        console.log('Categoría actualizada:', categoriaActualizada);
        this.obtenerCategorias();
        // Cerrar el modal aquí si es necesario
      },
      error => {
        console.error('Error al actualizar categoría:', error);
      }
    );
  }
}