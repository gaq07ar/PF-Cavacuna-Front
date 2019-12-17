import { Component, OnInit, Input } from "@angular/core";
import { Device } from "../../shared/device.model";
import { AuthService } from "src/app/services/auth.service";
import { DevicesService } from "src/app/services/devices.service";
import { Subject } from "rxjs";

@Component({
  selector: "app-devices",
  templateUrl: "./devices.component.html",
  styleUrls: ["./devices.component.css"]
})
export class DevicesComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  isFetching = false;
  adminId: string;
  devices: Device[] = [];
  isUserVerified = false;

  constructor(
    public auth: AuthService,
    private devicesService: DevicesService
  ) {}

  ngOnInit() {
    this.dtOptions = {
      pagingType: "full_numbers",
      language: {
        emptyTable: "No hay información disponible en la tabla",
        info: "Mostrando _START_ de _END_ de _TOTAL_ entradas",
        infoEmpty: "Mostrando 0 de 0 de 0 entradas",
        infoFiltered: "(filtradas de _MAX_ total de entradas)",
        infoPostFix: "",
        lengthMenu: "Mostrar _MENU_ entradas",
        loadingRecords: "Cargando...",
        processing: "Procesando...",
        search: "Buscar:",
        zeroRecords: "No hay resultados para la búsqueda",
        paginate: {
          first: "Primera",
          last: "Última",
          next: "Siguiente",
          previous: "Anterior"
        },
        aria: {
          sortAscending:
            ": activar para ordenar las columnas de forma ascendente",
          sortDescending:
            ": activar para ordenar las columnas de forma descendente"
        }
      }
    };
    this.isFetching = true;
    this.processInitialData();
    this.isFetching = false;
  }

  private processInitialData() {
    this.auth.userProfile$.subscribe(userInfo => {
      if (userInfo.hasOwnProperty("email_verified")) {
        this.isUserVerified = userInfo.email_verified;
      }
      if (this.isUserVerified) {
        this.devicesService.fetchDevices(userInfo.email).subscribe(
          devices => {
            this.isFetching = false;
            this.devices = devices;
            this.dtTrigger.next();
          },
          error => {
            this.isFetching = false;
          }
        );
      } else {
        this.isFetching = false;
        document.getElementById("modalVerification").click();
      }
    });
  }
}
