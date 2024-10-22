import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MenuComponent } from '../menu/menu.component';


@Component({
  selector: 'app-persona',
  standalone: true,
  imports: [CommonModule, MenuComponent],
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})
export class PersonaComponent {

  persona: any[] = [];
  cargar: boolean = false;


  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.buscarPersona();
  }

  buscarPersona() {
    this.cargar = true;
    this.buscarPersonaServicio().subscribe(
      (response: any) => this.mostrarPersona(response)
    );
  }

  mostrarPersona(response: any) {
    this.cargar = false;
    this.persona = response;
  }

  buscarPersonaServicio(): Observable<any> {
    return this.http.get<any>("http://analisischarlie.duckdns.org/persona/buscar").pipe(
      catchError(e => {
        console.error(e);
        return throwError(e);
      })
    );
  }

  eliminar(idpersona: any) {
    this.cargar = true;
    this.eliminarPersonaServicio(idpersona).subscribe(
      (response: any) => {

        alert('Persona eliminada exitosamente.');
        this.buscarPersona();
      },
      (error: any) => {
        console.error('Error al eliminar la persona:', error);
        this.cargar = false;
      }
    );
  }


  eliminarPersonaServicio(id: any): Observable<any> {
    return this.http.delete<any>(`http://analisischarlie.duckdns.org/persona/eliminar/${id}`).pipe(
      catchError(e => {
        console.error(e);
        return throwError(e);
      })
    );
  }

  actualizar(){
    this.router.navigate(['/actualizarpersona']);
  }

}
