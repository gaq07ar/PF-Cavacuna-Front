export class Slot {
  public slotNumber: number;
  public vaccineId: string;
  public vaccineDescription: string;
  public isApplied: boolean;

  constructor(
    slotNumber: number,
    vaccineId: string,
    vaccineDescription: string,
    isApplied: boolean
  ) {
    this.slotNumber = slotNumber;
    this.vaccineId = vaccineId;
    this.vaccineDescription = vaccineDescription;
    this.isApplied = isApplied;
  }
}
