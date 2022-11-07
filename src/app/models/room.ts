import { Message } from "./message";
import { User } from "./user";
import { _DisposeViewRepeaterStrategy } from "@angular/cdk/collections";

export class Room {

  readonly _id?: string
  ownersID?: User[]
  usersID?: User[]
  messagesID?: Message[]

}
