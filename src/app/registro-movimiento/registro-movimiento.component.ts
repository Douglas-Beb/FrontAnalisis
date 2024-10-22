import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { catchError } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Component({
  selector: 'app-registro-movimiento',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './registro-movimiento.component.html',
  styleUrl: './registro-movimiento.component.css',
})
export class RegistroMovimientoComponent {

  cargar: boolean = false;
  genero: any[] = [];
  movimientoCuenta: any = {};
  tipomov: any[] = [];
  saldopersona: any[] = [];
  persona: any[] = [];



  constructor(private http: HttpClient) {
    this.cargarTipoMovmiento();
    this.cargarPersona();
  }

  cargarTipoMovmiento() {
    this.http.get<any[]>("http://analisischarlie.duckdns.org/tipomovimientocxc/buscar").subscribe(
      data => this.tipomov = data,
      error => console.error("Error al cargar los movimientos", error)
    );
  }

  cargarPersona() {
    this.http.get<any[]>("http://analisischarlie.duckdns.org/saldoCuenta/buscar").subscribe(
      data => this.persona = data,
      error => console.error("Error al cargar los movimientos", error)
    );
  }


  agregar() {
    let formulario: any = document.getElementById("formulario");
    if (formulario.reportValidity()) {
      this.cargar = true;
      console.log(this.movimientoCuenta); // Verifica los datos que se enviarán
      this.servicioGuardar().subscribe(
        (response: any) => this.resultadoServicio(response)
      );
    }
  }

  resultadoServicio(res: any) {
    this.cargar = false;
    alert("Movimiento creado exitosamente")
    // location.href = "/tablasaldocuenta";
  }

  servicioGuardar() {
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return this.http.post<any>("http://analisischarlie.duckdns.org/movimientoCuenta/guardar", this.movimientoCuenta, httpOptions).pipe(
      catchError(e => "error")
    )
  }

}
