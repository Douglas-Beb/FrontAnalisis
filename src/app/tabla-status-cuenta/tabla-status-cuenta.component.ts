import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';

@Component({
  selector: 'app-tabla-status-cuenta',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tabla-status-cuenta.component.html',
  styleUrl: './tabla-status-cuenta.component.css'
})
export class TablaStatusCuentaComponent {

  statuscuenta: any[] = [];
  cargar: boolean = false;


  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.buscarStatusCuenta();
  }

  buscarStatusCuenta() {
    this.cargar = true;
    this.buscarStatusCuentaServicio().subscribe(
      (response: any) => this.mostrarStatusCuenta(response)
    );
  }

  mostrarStatusCuenta(response: any) {
    this.cargar = false;
    this.statuscuenta = response;
  }

  buscarStatusCuentaServicio(): Observable<any> {
    return this.http.get<any>("http://analisischarlie.duckdns.org/statuscuenta/buscar").pipe(
      catchError(e => {
        console.error(e);
        return throwError(e);
      })
    );
  }

  eliminar(idstatuscuenta: any) {
    this.cargar = true;
    this.eliminarStatusCuentaServicio(idstatuscuenta).subscribe(
      (response: any) => {
        // Mostrar el cuadro de diálogo
        alert('Status cuenta eliminada exitosamente.');
        // Actualizar la lista de empresas
        this.buscarStatusCuenta();
      },
      (error: any) => {
        console.error('Error al eliminar status cuenta:', error);
        this.cargar = false; // Ocultar la barra de progreso si hay un error
      }
    );
  }


  eliminarStatusCuentaServicio(id: any): Observable<any> {
    return this.http.delete<any>(`http://analisischarlie.duckdns.org/statuscuenta/eliminar/${id}`).pipe(
      catchError(e => {
        console.error(e);
        return throwError(e);
      })
    );
  }

  actualizar(){
    this.router.navigate(['/actualizarstatuscuenta']);
  }

}
