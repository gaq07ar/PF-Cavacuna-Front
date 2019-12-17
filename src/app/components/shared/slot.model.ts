export class Slot {
  // slot smallint PK
  // device_id bigint FK PK
  // user_vaccine_id varchar(100) NN
  // vaccine_id bigint FK
  // admission_date timestamp
  // departure_date timestamp
  // is_applied boolean
  // is_compromised boolean

  public slot: number;
  public user_vaccine_id: string;
  public vaccine_id: string;
  public is_applied: boolean;
  public is_compromised: boolean;

  constructor(
    slot: number,
    user_vaccine_id: string,
    vaccine_id: string,
    is_applied: boolean,
    is_compromised: boolean
  ) {
    this.slot = slot;
    this.user_vaccine_id = user_vaccine_id;
    this.vaccine_id = vaccine_id;
    this.is_applied = is_applied;
    this.is_compromised = is_compromised;
  }
}
