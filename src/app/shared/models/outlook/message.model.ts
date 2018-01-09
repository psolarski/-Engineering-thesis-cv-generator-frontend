import { Recipient } from './recipient.model';

export class Message {

  id: string;
  receivedDateTime: string;
  from: Recipient;
  isRead: boolean;
  subject: string;
  bodyPreview: string;
}
