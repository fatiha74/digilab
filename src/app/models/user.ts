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

  public firstName!: string;
  public lastName!: string;
  public email!: string;

  public imgUrl?: string;
  // readonly id: number = 0;
  public avatar?: string;

  constructor(firstName: string, lastName: string, email: string, imgUrl: string) {


    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.avatar = imgUrl;
  }

  getEmail(): string {
    return this.email
  }

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


