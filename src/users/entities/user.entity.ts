export class User {
  id: number;
  email: string;
  password: string;
  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
