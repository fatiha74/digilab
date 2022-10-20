import { Pipe, PipeTransform } from '@angular/core';



@Pipe({
  name: 'age'
})

export class AgePipe implements PipeTransform {


  // on doit transformer quelque chose, et on retourne le resultat
  transform(value: any): number {
    let val = new Date(value).getFullYear();
    let today = new Date().getFullYear();
    let ageToday = (today - val)

    return ageToday;

  }

}
