export class Notification {

  description: string;
  creationDate: Date;

  constructor(des: string, date:Date) {
    this.description = des;
    this.creationDate = date;
  }
}
