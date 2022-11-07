import { Component, OnInit } from '@angular/core';
import { map, startWith } from 'rxjs';

import { job } from 'src/helpers/job';

@Component({
  selector: 'app-finder',
  templateUrl: './finder.component.html',
  styleUrls: ['./finder.component.scss']
})
export class FinderComponent implements OnInit {

opened=false

  constructor() { }

  ngOnInit(): void {
// console.log(job)
      // ds le userForm tu va filtrer les pays
    // @ts-ignore
    // this.filteredOptions = this.userForm?.get('country')?.valueChanges.pipe(
    //   startWith(''),
    //   map(value => this._filter(value || '')),
    // );

  }

  // private _filter(value: string): string[] {
  //   const filterValue = value.toLowerCase();
  //   return this.option?.filter(option => option.toLowerCase().includes(filterValue));
  // }

}
