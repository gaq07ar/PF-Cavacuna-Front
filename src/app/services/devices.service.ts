import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { environment } from "../../environments/environment";
import { Device } from "../components/shared/device.model";

@Injectable({
  providedIn: "root"
})
export class DevicesService {
  constructor(private http: HttpClient) {}

  fetchDevices(username: string) {
    return this.http
      .get<Device[]>(
        "http://" +
          environment.cavacunaAPIAddress +
          "/api/device/getDevicesForUser/" +
          username
      )
      .pipe(
        map(responseData => {
          const deviceArray: Device[] = [];
          for (const element of responseData) {
            deviceArray.push(element);
          }
          return deviceArray;
        })
      );
  }
}
