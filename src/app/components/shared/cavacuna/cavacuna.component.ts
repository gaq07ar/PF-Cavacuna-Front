import { Component, OnInit, Input } from "@angular/core";
import { Device } from "../device.model";
import { Slot } from "../slot.model";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Vaccine } from "../vaccine.model";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-cavacuna",
  templateUrl: "./cavacuna.component.html",
  styleUrls: ["./cavacuna.component.css"]
})
export class CavacunaComponent implements OnInit {
  @Input() device: Device;
  @Input() i: number;
  vacunas: Vaccine[] = [];
  selectedVaccine: Vaccine = null;
  actualTemperature: number;
  isFetching = false;
  acceptedRange: number[] = [];
  minTemp: number;
  maxTemp: number;
  selectedOption: string = null;
  vacunaPrueba: string = null;
  selectedValue: string = null;

  slots: Slot[] = [];
  // slots = new Map<number, Slot>();
  // slots: Slot[] = [
  //   new Slot(1, null, null, false),
  //   new Slot(2, null, null, false),
  //   new Slot(3, null, null, false),
  //   new Slot(4, null, null, true)
  // ];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.minTemp = Number(this.device.min_temp);
    this.maxTemp = Number(this.device.max_temp);
    this.acceptedRange.push(this.minTemp + 2);
    this.acceptedRange.push(this.maxTemp - 2);
    this.isFetching = true;
    this.fetchVaccines();
    this.fetchSlots();
    // for (let i = 0; i < this.device.slots_amount; i++) {
    //   this.slots.set(i + 1, new Slot(i + 1, null, null, false, false));
    // }
    setInterval(() => this.fetchPosts(), 5000);
  }

  fetchSlots() {
    this.http
      .get(
        "https://" +
          environment.cavacunaAPIAddress +
          "/api/device/getStorageRelatedInformation/" +
          this.device.id
      )
      .subscribe((fetchedSlots: Slot[]) => {
        this.slots = fetchedSlots;
        this.isFetching = false;
      });
    // localhost:3000/api/device/getStorageRelatedInformation/12345
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
        // Only for demo purposes
        // Production code goes like:
        // this.actualTemperature = lastEntry;
        this.actualTemperature = 15;
        this.isFetching = false;
      });
  }

  private fetchVaccines() {
    this.http
      .get("https://" + environment.cavacunaAPIAddress + "/api/vaccine")
      .subscribe((fetchedVaccines: Vaccine[]) => {
        this.vacunas = fetchedVaccines;
        this.isFetching = false;
      });
  }

  public onChange(event): void {
    const newVal = event.target.value;
    console.log(newVal);
  }

  showSelectedVaccine(i: number) {
    console.log(this.slots[i]);
  }

  addRegistryAndClean(i: number) {
    const slotToAdd: Slot = this.slots[i];
    if (!slotToAdd.user_vaccine_id && !slotToAdd.vaccine_id) {
      document.getElementById("modalIdSlotVaccineId").click();
    } else if (!slotToAdd.user_vaccine_id) {
      document.getElementById("modalIdSlot").click();
    } else if (!slotToAdd.vaccine_id) {
      document.getElementById("modalVaccineId").click();
    } else
      this.http
        .post(
          "https://" +
            environment.cavacunaAPIAddress +
            "/api/storage/addSlotRegistry",
          {
            slot: slotToAdd.slot,
            deviceId: this.device.id,
            userVaccineId: slotToAdd.user_vaccine_id,
            vaccineId: slotToAdd.vaccine_id
          }
        )
        .subscribe(slotAdded => {
          this.slots[i].user_vaccine_id = null;
          this.slots[i].vaccine_id = "";
        });
  }

  deleteValuesInSlot(i: number) {
    this.slots[i].user_vaccine_id = null;
    this.slots[i].vaccine_id = "";
  }

  saveRegistry(i: number) {
    const slotToModify: Slot = this.slots[i];
    if (!slotToModify.user_vaccine_id && !slotToModify.vaccine_id) {
      document.getElementById("modalIdSlotVaccineId").click();
    } else if (!slotToModify.user_vaccine_id) {
      document.getElementById("modalIdSlot").click();
    } else if (!slotToModify.vaccine_id) {
      document.getElementById("modalVaccineId").click();
    } else {
      this.http
        .put(
          "https://" + environment.cavacunaAPIAddress + "/api/storage/saveSlot",
          {
            slot: slotToModify.slot,
            deviceId: this.device.id,
            userVaccineId: slotToModify.user_vaccine_id,
            vaccineId: slotToModify.vaccine_id
          }
        )
        .subscribe(slotAdded => {
          console.log(slotAdded);
        });
    }
  }
}
