export class User {
  public createdAt: string;
  public id: string;
  public is_admin: boolean;
  public name: string;
  public last_name: string;
  public phone: string;
  public updatedAt: string;

  constructor(
    createdAt: string,
    id: string,
    is_admin: boolean,
    name: string,
    last_name: string,
    phone: string,
    updatedAt: string
  ) {
    this.createdAt = createdAt;
    this.id = id;
    this.is_admin = is_admin;
    this.name = name;
    this.last_name = last_name;
    this.phone = phone;
    this.updatedAt = updatedAt;
  }
}
