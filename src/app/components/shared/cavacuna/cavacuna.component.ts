import { Component, OnInit, Input } from "@angular/core";
import { Device } from "../device.model";
import { Slot } from "../slot.model";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";

@Component({
  selector: "app-cavacuna",
  templateUrl: "./cavacuna.component.html",
  styleUrls: ["./cavacuna.component.css"]
})
export class CavacunaComponent implements OnInit {
  @Input() device: Device;
  @Input() i: number;
  actualTemperature: number;
  isFetching = false;
  acceptedRange: number[] = [];
  minTemp: number;
  maxTemp: number;
  selectedOption: string = null;
  vacunaPrueba: string = null;

  slots: Slot[] = [
    new Slot(1, null, null, false),
    new Slot(2, null, null, false),
    new Slot(3, null, null, false),
    new Slot(4, null, null, true)
  ];

  vacunas = [
    "Polio Oral",
    "Polio inactivada (IPV)",
    "BCG",
    "DTP",
    "Hepatitis B",
    "Haemophilus influenzae b",
    "dTpa",
    "Td/T",
    "Hepatitis A",
    "Triple vírica (sarampión, rubeola, paperas)",
    "Meningocócica conjugada",
    "Gripe",
    "Varicela",
    "Neumocócica Polisacarida",
    "Neumocócica Conjugada",
    "Rabia",
    "Fiebre amarilla",
    "Rotavirus",
    "Papilomavirus (bivalente)"
  ];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.minTemp = Number(this.device.min_temp);
    this.maxTemp = Number(this.device.max_temp);
    this.acceptedRange.push(this.minTemp + 2);
    this.acceptedRange.push(this.maxTemp - 2);
    this.isFetching = true;
    setInterval(() => this.fetchPosts(), 5000);
  }

  checkWarningValidation(incomingTemperature: number): boolean {
    return (
      (incomingTemperature >= this.minTemp &&
        incomingTemperature <= this.acceptedRange[0]) ||
      (incomingTemperature >= this.acceptedRange[1] &&
        incomingTemperature <= this.maxTemp)
    );
  }

  checkColdDangerValidation(incomingTemperature: number): boolean {
    return incomingTemperature < this.minTemp;
  }

  checkHotDangerValidation(incomingTemperature: number): boolean {
    return incomingTemperature > this.maxTemp;
  }

  private fetchPosts() {
    this.http
      .get(
        "https://api.thingspeak.com/channels/" +
          this.device.id +
          "/fields/1/last.json?timezone=America%2FArgentina%2FBuenos_Aires"
      )
      .pipe(
        map(
          (responseData: {
            created_at: string;
            entry_id: string;
            field1: number;
          }) => {
            return responseData.field1;
          }
        )
      )
      .subscribe(lastEntry => {
        console.log(lastEntry);
        // Only for demo purposes
        // Production code goes like:
        // this.actualTemperature = lastEntry;
        this.actualTemperature = 15;
        this.isFetching = false;
      });
  }

  setValueToSlot() {
    console.log(this.selectedOption);
    console.log(this.vacunaPrueba);
  }

  trackByIdx(index: number, obj: any): any {
    return index;
  }
}
