import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  user:any=null; 
  ngOnInit(): void{
      this.user=this.login.getUser();
  }
  constructor(private login:LoginService){
         
  }
}
