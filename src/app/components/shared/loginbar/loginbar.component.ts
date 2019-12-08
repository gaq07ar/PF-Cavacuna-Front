import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-loginbar",
  templateUrl: "./loginbar.component.html",
  styleUrls: ["./loginbar.component.css"]
})
export class LoginbarComponent implements OnInit {
  constructor(public auth: AuthService) {}

  ngOnInit() {
    this.auth.handleAuthCallback();
  }
}
