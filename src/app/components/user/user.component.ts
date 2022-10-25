import { Component, OnInit } from '@angular/core';

// on importe le service
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {


  dataUser!: any

  constructor(private userService: UserService) { }

  ngOnInit(): void {

    // je souscri à l'abonnement
    this.userService.getUsers().subscribe((value: any) => (this.dataUser = value.data));

    // this.userService.getUser().subscribe((value: any) => {
    //   console.log(value.data)
    // })
  }

}
