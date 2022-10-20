export class Directory {
  public nom!: string;
  public path!: string;
  public description!: string;


  constructor(nom: string, path: string, description: string) {
    this.nom = nom;
    this.path = path;
    this.description = description;
  }
}
