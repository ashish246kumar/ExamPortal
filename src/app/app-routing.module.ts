import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { AdminGuard } from './services/admin.guard';
import { NormalGuard } from './services/normal.guard';
import { ProfileComponent } from './pages/profile/profile.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { ViewCategoriesComponent } from './pages/admin/view-categories/view-categories.component';
import { AddCategoryComponent } from './pages/admin/add-category/add-category.component';
import { ViewQuizesComponent } from './pages/admin/view-quizes/view-quizes.component';
import { AddQuizComponent } from './pages/admin/add-quiz/add-quiz.component';
import { UpdateComponent } from './pages/admin/update/update.component';
import { ViewQuizQuestionComponent } from './pages/admin/view-quiz-question/view-quiz-question.component';
import { AddQuestionComponent } from './pages/admin/add-question/add-question.component';
import { LoadquizComponent } from './pages/user/loadquiz/loadquiz.component';
import { InstructionComponent } from './pages/user/instruction/instruction.component';
import { StartComponent } from './pages/user/start/start.component';

const routes: Routes = [
  {
    path:'signup',
    component:SignupComponent,
    pathMatch:'full'
  },
  {
    path:'login',
    component:LoginComponent,
    pathMatch:'full'
  },
  {
    path:'',
    component:HomeComponent,
    pathMatch:'full'

  },
  {
     path:'admin',
     component:DashboardComponent,
     canActivate:[AdminGuard],
     children:[
      {
        path:'profile',
        component:ProfileComponent
      },
      {
        path:'',
        component:WelcomeComponent
      },
      {
        path:'categories',
        component:ViewCategoriesComponent
      },
      {
        path:'add-category',
        component:AddCategoryComponent
      },
      {
        path:'quizzes',
        component:ViewQuizesComponent
      },
      {
        path:'add-quiz',
        component:AddQuizComponent
      },
      {
          path:'quiz/:qid',
          component:UpdateComponent
      },
      {
         path:'add-question/:qid/:title',
         component:ViewQuizQuestionComponent
      },
      {
        path:"question-add/:qid/:title",
        component:AddQuestionComponent
      }
     ]
    
  },
  {
    path:'user-dashboard',
    component:UserDashboardComponent,
    canActivate:[NormalGuard],
    children:[
         {
             path:':cid',
             component:LoadquizComponent
         },
         {
            path:'instruction/:qid',
            component:InstructionComponent
         },
         
    ],
  },
  {
    path:'start/:qid',
    component:StartComponent,
    canActivate:[NormalGuard]
 }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
