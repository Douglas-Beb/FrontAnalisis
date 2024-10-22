import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { MenuComponent } from "../menu/menu.component";

@Component({
  selector: 'app-tabla-saldo-cuenta',
  standalone: true,
  imports: [CommonModule, HttpClientModule, MenuComponent],
  templateUrl: './tabla-saldo-cuenta.component.html',
  styleUrl: './tabla-saldo-cuenta.component.css'
})
export class TablaSaldoCuentaComponent {

  saldocuenta: any[] = [];
  saldocuentanombre: any[] = [];
  persona: any[] = [];
  status: any[] = [];
  cargar: boolean = false;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.buscarSaldoCuenta();
    this.cargarPersona();
    this.cargarStatus();
  }

  cargarPersona() {
    this.http.get<any[]>("http://analisischarlie.duckdns.org/persona/buscar").subscribe(
      data => this.persona = data,
      error => console.error("Error al cargar las empresas", error)
    );
  }

  cargarStatus() {
    this.http.get<any[]>("http://analisischarlie.duckdns.org/statuscuenta/buscar").subscribe(
      data => this.status = data,
      error => console.error("Error al cargar las empresas", error)
    );
  }

  buscarSaldoCuenta() {
    this.cargar = true;
    this.buscarSaldoCuentaServicio().subscribe(
      (response: any) => this.mostrarSaldoCuenta(response)
    );
  }

  mostrarSaldoCuenta(response: any) {
    this.cargar = false;
    this.saldocuentanombre = response;
  }

  buscarSaldoCuentaServicio(): Observable<any> {
    return this.http.get<any>("http://analisischarlie.duckdns.org/saldoCuenta/buscar").pipe(
      catchError(e => {
        console.error(e);
        return throwError(e);
      })
    );
  } 

  getPersonaNombre(id: any): string {
    const persona = this.persona.find(p => p.idpersona === id);
    return persona ? persona.nombre : 'Desconocido';
  } 

  getStatusCuenta(id: any): string {
    const status = this.status.find(p => p.idstatuscuenta === id);
    return status ? status.nombre : 'Desconocido';
  }
}

