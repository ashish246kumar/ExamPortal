import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-user-sidebar',
  templateUrl: './user-sidebar.component.html',
  styleUrls: ['./user-sidebar.component.css']
})
export class UserSidebarComponent implements OnInit{
  container=[
    {
      cid:'',
      description:'',
      title:''
    }
  ];
  ngOnInit(): void {
    this.category.Categories().subscribe((data:any)=>{
         this.container=data
    },
    (error)=>{
        this.snack.open("Error in loading Categories","",{
            duration:3000,
        })
    }
    )
  }

  constructor(private category:CategoryService,private snack:MatSnackBar){
               

   } 

    
}
