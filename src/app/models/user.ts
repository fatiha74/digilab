import { Message } from "./message";
import { Room } from "./room";

// exemple heritage
class Role {

  // inférence TS devine le type
  public isAdmin = true;

  constructor(isAdmin = false) {
    this.isAdmin = isAdmin
  }
}

// extends = herite de Role pour acceder aux attributs de cette class
// avec super(attribut de la class herite)
// on oblige à implementer getEmail(), implements pour utiliser cette interface
export class User {

  username!: string
  firstName!: string
  lastName!: string
  avatar!: string
  readonly _id?: string
  password?: string
  email?: string
  roomID?: Room[]
  sentMessagesID?: Message[]
  receivedMessagesID?: Message[]
  isLoggedIn?: boolean
  token?: string
  country?: string
  city?: string
  street?: string
  zipCode?: number
  phoneNumber?: string
  dialCode?: string
  skills?: string[]
  role?: string
  friendsID?: User[]
  dateOfBirth?:string | Date
  online?:boolean
  nbMsgEnAttente?:number


  constructor() {


    // this.username = firstName;
    // this.lastName = lastName;
    // this.email = email;
    // this.avatar = imgUrl;
  }

  // getEmail(): string {
  //   // return this.email
  // }

}

// on cree une interface dans {} on déclare les methodes
// pour imposer des attributs et des methodes à ceux qui utilisent ces interfaces
// interface IUser {

//     // obligatoire
//     age: number;
//     email: string;

//     //on n'implemente pas on declare avec le type de retour
//     getEmail(): string;
// }


