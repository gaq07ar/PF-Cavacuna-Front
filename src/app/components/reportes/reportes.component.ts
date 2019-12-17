import {
  Component,
  OnInit,
  ViewChild,
  ChangeDetectorRef,
  AfterViewInit
} from "@angular/core";
import { Device } from "../shared/device.model";
import { AuthService } from "src/app/services/auth.service";
import { DevicesService } from "src/app/services/devices.service";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { UserService } from "src/app/services/user.service";
import { NgForm, FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: "app-reportes",
  templateUrl: "./reportes.component.html",
  styleUrls: ["./reportes.component.css"]
})
export class ReportesComponent implements OnInit {
  devices: Device[] = [];
  isUserVerified = false;
  isFetching = false;
  selectedDevice: Device;
  reportsForm: FormGroup;
  firstGraph: SafeResourceUrl;
  secondGraph: SafeResourceUrl;

  // minDate: string;
  // maxDate: string;
  // firstGraph: String =
  //   "https://thingspeak.com/channels/" +
  //   this.selectedDevice.id +
  //   "/charts/1?bgcolor=%23ffffff&color=%239fe1fd&dynamic=true&results=60&title=Hist%C3%B3rico+de+Temperaturas&type=line&xaxis=Minutos&yaxis=Grados";

  constructor(
    public auth: AuthService,
    private userService: UserService,
    public sanitizer: DomSanitizer
  ) {
    this.selectedDevice = null;
    // this.minDate = null;
    // this.maxDate = null;
  }

  ngOnInit() {
    this.reportsForm = new FormGroup({
      device: new FormControl(null, Validators.required),
      startDate: new FormControl(null, [
        Validators.required,
        this.invalidStartDate.bind(this)
      ]),
      endDate: new FormControl(null, [
        Validators.required,
        this.invalidEndDate.bind(this)
      ])
    });
    this.isFetching = true;
    this.processInitialInformation();
  }

  onSubmit() {
    // console.log(this.reportsForm);
    if (this.reportsForm.valid) {
      this.selectedDevice = this.reportsForm.get("device").value;
      this.firstGraph = this.sanitizer.bypassSecurityTrustResourceUrl(
        "https://thingspeak.com/channels/" +
          this.selectedDevice.id +
          "/charts/1?bgcolor=%23ffffff&color=%239fe1fd&dynamic=true&title=Hist%C3%B3rico+de+Temperaturas&type=line&xaxis=Minutos&yaxis=Grados&start=" +
          this.reportsForm.get("startDate").value +
          "%2000:00:00" +
          "&end=" +
          this.reportsForm.get("endDate").value +
          "%2000:00:00"
      );
      this.secondGraph = this.sanitizer.bypassSecurityTrustResourceUrl(
        "https://thingspeak.com/channels/" +
          this.selectedDevice.id +
          "/widgets/121575"
      );
    }
  }

  private async processInitialInformation() {
    const userInfo = await this.userService.getUserInformation();
    this.isUserVerified = userInfo.email_verified;
    const username = userInfo.email;
    if (this.isUserVerified) {
      this.devices = await this.userService.getDevicesForUser(username);
    }
    this.isFetching = false;
  }

  onUpdateDevice(event: any) {
    console.log(event);
  }

  bindDevice(device: Device) {
    console.log(JSON.stringify(device));
    if (device !== null) {
      this.selectedDevice = device;
    }
  }

  getCSVFile(deviceId: string, deviceDescription: string): string {
    return (
      "https://thingspeak.com/channels/" +
      this.selectedDevice.id +
      "/field/" +
      this.selectedDevice.description +
      ".csv"
    );
  }

  invalidStartDate(control: FormControl): { [s: string]: boolean } {
    if (control.parent) {
      if (control.value !== null && control.parent.value["endDate"] !== null) {
        const startDate = new Date(control.value);
        const endDate = new Date(control.parent.value["endDate"]);
        if (startDate > endDate) {
          return { startDateInvalid: true };
        }
      }
    }
    return null;
  }

  invalidEndDate(control: FormControl): { [s: string]: boolean } {
    if (control.parent) {
      if (
        control.value !== null &&
        control.parent.value["startDate"] !== null
      ) {
        const startDate = new Date(control.parent.value["startDate"]);
        const endDate = new Date(control.value);
        if (endDate < startDate) {
          return { endDateInvalid: true };
        }
      }
    }
    return null;
  }
}
