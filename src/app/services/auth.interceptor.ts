import { ObserversModule } from "@angular/cdk/observers";
import { HTTP_INTERCEPTORS, HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from '@angular/core';
import { LoginService } from "./login.service";
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
     constructor(private login:LoginService){

     }  
    intercept(req:HttpRequest<any>,next:HttpHandler):Observable<HttpEvent<any>> {
        const token=this.login.getToken();
        let authReq=req;
         if(token!=null){
            authReq=authReq.clone({setHeaders:{Authorization:`Bearer ${token}`}})
         }
         return next.handle(authReq);
    }
}
 
export const authInterceptorProviders=[
    {
        provide:HTTP_INTERCEPTORS,
        useClass:AuthInterceptor,
        multi:true,

    },

]