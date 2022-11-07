import { Room } from "./room";
import { User } from "./user";
export class ChatMessage {

  readonly _id?: string;
   userID?: User[];
  content?: string;
  date?: Date;
  friendID?: User[];

  __v?: number;
}
