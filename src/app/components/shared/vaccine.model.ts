export class Vaccine {
  public createdAt: string;
  public id: string;
  public description: string;
  public updatedAt: string;

  constructor(
    createdAt: string,
    id: string,
    description: string,
    updatedAt: string
  ) {
    this.createdAt = createdAt;
    this.id = id;
    this.description = description;
    this.updatedAt = updatedAt;
  }
}
