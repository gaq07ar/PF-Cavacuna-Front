import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { Device } from "../shared/device.model";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-inicio",
  templateUrl: "./inicio.component.html",
  styleUrls: ["./inicio.component.css"]
})
export class InicioComponent implements OnInit {
  username: string;
  isAdmin: boolean;
  devices: Device[];
  isUserVerified = false;
  isFetching = false;

  constructor(public auth: AuthService, private userService: UserService) {}

  ngOnInit() {
    this.isFetching = true;
    this.processInitialInformation();
  }

  private async processInitialInformation() {
    const userInfo = await this.userService.getUserInformation();
    this.isUserVerified = userInfo.email_verified;
    this.username = userInfo.email;
    this.isAdmin = await this.userService.isAdmin(this.username).toPromise();
    if (this.isUserVerified) {
      this.isFetching = false;
      this.devices = await this.userService.getDevicesForUser(this.username);
    } else {
      this.devices = [];
      this.isFetching = false;
      document.getElementById("modalVerification").click();
    }
  }
}
