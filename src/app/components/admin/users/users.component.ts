import { Component, OnInit } from "@angular/core";
import { Subject } from "rxjs";
import { AuthService } from "src/app/services/auth.service";
import { UserService } from "src/app/services/user.service";
import { DevicesService } from "src/app/services/devices.service";
import { Device } from "../../shared/device.model";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.css"]
})
export class UsersComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  isFetching = false;
  users: [[string, number]] = [["", 0]];
  adminId: string;
  isUserVerified = false;

  constructor(
    public auth: AuthService,
    private userService: UserService,
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
    this.getUsuariosForAdmin();
    this.isFetching = false;
  }

  getUsuariosForAdmin() {
    this.auth.userProfile$.subscribe(userInfo => {
      this.adminId = userInfo.email;
      this.userService
        .fetchRegisteredUsersForAdmin(this.adminId)
        .subscribe(users => {
          this.users = users;
          this.dtTrigger.next();
        });
    });
  }

  createUser() {
    let isValid: boolean = false;
    while (!isValid) {
      let newUserAndDeviceId: string = prompt(
        "Escriba el nombre del usuario nuevo y el id de la heladera separada por espacio"
      );
      const splitted = newUserAndDeviceId.split(" ");
      let userId = splitted[0];
      let deviceId = Number(splitted[1]);
      if (userId.length >= 6 && !isNaN(deviceId)) {
        this.auth.userProfile$.subscribe(userInfo => {
          this.userService
            .addUserToAdmin(userInfo.email, userId, deviceId)
            .subscribe(
              newUser => {
                this.users.push([userId, deviceId]);
                alert("Usuario añadido correctamente");
              },
              error => {
                alert(
                  "El usuario debe estar registrado y el id de la heladera tiene que ser uno de los disponibles"
                );
              }
            );
        });
        isValid = true;
      } else {
        alert(
          "El nombre del usuario debe ser mayor que 6 y el código de heladera debe ser un valor numérico"
        );
      }
    }
  }

  deleteUser(userId: string, deviceId: number) {
    this.userService
      .removeUserForAdmin(this.adminId, userId, deviceId)
      .subscribe(
        deletedUser => {
          alert(
            "Usuario: " +
              userId +
              " con heladera asignada: " +
              deviceId +
              " eliminado correctamente"
          );
          for (var i = 0; i < this.users.length; i++) {
            if (this.users[i][0] == userId && this.users[i][1] == deviceId) {
              this.users.splice(i, 1);
            }
          }
        },
        error => {
          alert(
            "Ha ocurrido un error, por favor contactarse a cavacuna.project@gmail.com"
          );
        }
      );
  }

  private processInitialData() {
    this.auth.userProfile$.subscribe(userInfo => {
      if (userInfo.hasOwnProperty("email_verified")) {
        this.isUserVerified = userInfo.email_verified;
      }
    });
  }
}
