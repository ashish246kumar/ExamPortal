import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{
    constructor(private userService:UserService,private snack_bar:MatSnackBar){

    }  
    public user={
      username:'',
      firstName:'',
      lastName:'',
      email:'',
      phone:'',
      password:''
      

    };
  ngOnInit(): void {
      
  }
  formSubmit(){
   
     if(this.user.username==null||this.user.username==''){
          this.snack_bar.open('Username is Required !!','',{
            duration:3000,
            verticalPosition:'top',
            horizontalPosition:'right'
          });
           return;
     }
     this.userService.addUser(this.user).subscribe((data:any)=>{
            console.log(data);
            Swal.fire('Successfully done','user id is'+data.id,'success');
     },
     (error)=>{
          console.log(error)
          this.snack_bar.open('Something Went Wrong !!','',{
            duration:3000,
            verticalPosition:'top',
            horizontalPosition:'right'
          });
     }
     )
  }

}
