import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent implements OnInit {
  isAdmin: boolean;
  isFetching = false;

  constructor(public auth: AuthService, private userService: UserService) {}

  ngOnInit() {
    this.isFetching = true;
    this.auth.handleAuthCallback();
    this.getPermissionInformation();
  }

  private async getPermissionInformation() {
    const userInfo = await this.userService.getUserInformation();
    this.isAdmin = await this.userService.isAdmin(userInfo.email).toPromise();
    this.isFetching = false;
  }
}
