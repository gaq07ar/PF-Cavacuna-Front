export class Device {
  public created_at: string;
  public id: number;
  public slots_amount: number;
  public monitored_mode: boolean;
  public description: string;
  public min_temp: number;
  public max_temp: number;
  public updatedAt: string;

  constructor(
    created_at: string,
    id: number,
    slots_amount: number,
    monitored_mode: boolean,
    description: string,
    min_temp: number,
    max_temp: number,
    updatedAt: string
  ) {
    this.created_at = created_at;
    this.id = id;
    this.slots_amount = slots_amount;
    this.monitored_mode = monitored_mode;
    this.description = description;
    this.min_temp = min_temp;
    this.max_temp = max_temp;
    this.updatedAt = updatedAt;
  }
}
