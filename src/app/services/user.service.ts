import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { BehaviorSubject } from "rxjs";
import { User } from "../components/shared/user.model";
import { Device } from "../components/shared/device.model";
import { DevicesService } from "./devices.service";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class UserService {
  constructor(
    public auth: AuthService,
    private http: HttpClient,
    private devicesService: DevicesService
  ) {}

  isAdmin(username: string) {
    return this.http
      .get<User>(
        "http://" + environment.cavacunaAPIAddress + "/api/user/" + username
      )
      .pipe(
        map(userData => {
          return userData.is_admin;
        })
      );
  }

  fetchRegisteredUsersForAdmin(adminId: string) {
    return this.http.get<[[string, number]]>(
      "http://" +
        environment.cavacunaAPIAddress +
        "/api/user/getRegisteredUsersForAdmin/" +
        adminId
    );
  }

  addUserToAdmin(adminId: string, userId: string, deviceId) {
    return this.http.post(
      "http://" + environment.cavacunaAPIAddress + "/api/user/addUserToAdmin",
      {
        adminId: adminId,
        userId: userId,
        deviceId: deviceId
      }
    );
  }

  removeUserForAdmin(adminId: string, userId: string, deviceId: number) {
    const options = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      }),
      body: {
        adminId: adminId,
        userId: userId,
        deviceId: deviceId
      }
    };

    return this.http.delete(
      "http://" +
        environment.cavacunaAPIAddress +
        "/api/user/deleteRegisteredUserForAdmin",
      options
    );
  }

  async getUserInformation(): Promise<any> {
    return this.auth.getUser$().toPromise();
  }

  async getDevicesForUser(username: string): Promise<Device[]> {
    return this.devicesService.fetchDevices(username).toPromise();
  }
}

// .fetchDevices(userInfo.email)
