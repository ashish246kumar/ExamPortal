import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
    loginData={
       username:'',
       password:''
    }     
  ngOnInit(): void{

  }
  constructor(private snack:MatSnackBar,private login:LoginService,private router:Router){}
  formSubmit(){
       
    if(this.loginData.username.trim()==''||this.loginData.username==null){
            this.snack.open('username is required!!','',{
              duration:3000,
            });
            return;
    }
    if(this.loginData.password.trim()==''||this.loginData.password==null){
      this.snack.open('Password is required!!','',{
        duration:3000,
      });
      return;
}
  this.login.generateToken(this.loginData).subscribe((data:any)=>{
         console.log('sucess');
         console.log(data);
         this.login.loginUser(data.token)
         this.login.getCurrentUser().subscribe((user:any)=>{
          console.log(user);
          this.login.setUser(user);
              
              if(this.login.getUserRole()=="ADMIN"){
                    // window.location.href='/admin';
                    this.router.navigate(['admin']);
                    this.login.loginstatusSubject.next(true);

              }
              else if(this.login.getUserRole()=="NORMAL"){
                      // window.location.href='/user-dashboard';
                      this.router.navigate(['user-dashboard/0'])
                      this.login.loginstatusSubject.next(true);
              }
              else{
                       this.login.logout();

              }
         });

  },
  (error)=>{
         console.log(error)
         this.snack.open('Invalid Details !! Try Again','',{
          duration:3000,
         });
  }
  )   
      
  }

}
