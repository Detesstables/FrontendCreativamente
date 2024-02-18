import { Routes } from '@angular/router';
import { InicioComponent } from './components/views/inicio/inicio.component';
import { FormularioCategoriasComponent } from './components/views/formulario-categorias/formulario-categorias.component';

export const routes: Routes = [
    {
        path: 'inicio',
        title: 'Pagina principal',
        component: InicioComponent
    },
    {
        path:'',
        redirectTo: '/inicio',
        pathMatch: 'full'
    },
    {
        path: 'formularioCategoria',
        title: 'Formulario de categorias',
        component: FormularioCategoriasComponent
    }
];
