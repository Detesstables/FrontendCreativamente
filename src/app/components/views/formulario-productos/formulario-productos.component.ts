import { Component } from '@angular/core';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { CategoriaModel } from '../../../models/categoria.model';
import { CategoriasService } from '../../../services/categorias.service';
import { productoModel } from '../../../models/producto.model';
import { ProductosService } from '../../../services/productos.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-formulario-productos',
  standalone: true,
  imports: [NavbarComponent, ReactiveFormsModule],
  templateUrl: './formulario-productos.component.html',
  styleUrl: './formulario-productos.component.css'
})
export class FormularioProductosComponent {

  /* Array donde se almacenan los datos para luego mostrarlos en el front */
  productosLista: productoModel[] = []
  categoriasLista: CategoriaModel[] = []

  formularioProductos: FormGroup;

  constructor(private categoriaService: CategoriasService, private productoService: ProductosService, private form: FormBuilder){
    this.formularioProductos = this.form.group({
      nombre_producto: ['',Validators.required],
      precio: ['',Validators.required],
      imagen: ['', Validators.required],
      stock: ['', Validators.required],
      categoria: ['',Validators.required]
    }
    )
  }


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

    crearProducto() {
      if (this.formularioProductos.valid) {
        const producto = this.formularioProductos.value;
        console.log('Valor de categoria desde el formulario:', producto.categoria);
        console.log('Categorias disponibles:', this.categoriasLista); 
        const categoriaSeleccionada = this.categoriasLista.find(categoria => categoria.id_categoria === producto.categoria);
        console.log('Categoria seleccionada:', categoriaSeleccionada); 
    
        // Agregar logs adicionales para verificar los valores exactos
        console.log('Valores de id_categoria en categoriasLista:', this.categoriasLista.map(categoria => categoria.id_categoria));
    
        if (categoriaSeleccionada !== undefined) {
          // Aquí podrías asignar la categoría seleccionada al producto
          producto.categoria = categoriaSeleccionada;
          console.log('Categoria que se selecciona:', producto.categoria);
          console.log('producto que se va crear',producto)
          // Llamar al servicio para crear el producto
          this.productoService.crearProducto(producto).subscribe(
            (respuesta) => {
              console.log('Producto creado correctamente:', respuesta);
              // Aquí podrías redirigir al usuario a otra página o mostrar un mensaje de éxito
            },
            (error) => {
              console.error('Error al crear el producto:', error);
              // Aquí podrías mostrar un mensaje de error al usuario
            }
          );
        } else {
          console.error('No se encontró la categoría seleccionada');
        }
      } else {
        console.error('El formulario no es válido');
      }
    }
}




/* crearProducto() {
  if (this.formularioProductos.valid) {
    const producto = this.formularioProductos.value;
    console.log('Valor de categoria desde el formulario:', producto.categoria);
    console.log('Categorias disponibles:', this.categoriasLista); 
    const categoriaSeleccionada = this.categoriasLista.find(categoria => categoria.id_categoria === producto.categoria);
    console.log('Categoria seleccionada:', categoriaSeleccionada); 

    // Agregar logs adicionales para verificar los valores exactos
    console.log('Valores de id_categoria en categoriasLista:', this.categoriasLista.map(categoria => categoria.id_categoria));

    if (categoriaSeleccionada !== undefined) {
      producto.categoria = categoriaSeleccionada; 
      // Llamar al servicio para crear el producto
      this.productoService.crearProducto(producto).subscribe(
        (respuesta) => {
          console.log('Producto creado correctamente:', respuesta);
          // Aquí podrías redirigir al usuario a otra página o mostrar un mensaje de éxito
        },
        (error) => {
          console.error('Error al crear el producto:', error);
          // Aquí podrías mostrar un mensaje de error al usuario
        }
      );
    } else {
      console.error('No se encontró la categoría seleccionada');
    }
  } else {
    console.error('El formulario no es válido');
  }
} */