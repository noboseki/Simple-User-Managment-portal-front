import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../service/authentication.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authenticationService:AuthenticationService) {}

  intercept(request: HttpRequest<any>, httpHandler: HttpHandler): Observable<HttpEvent<any>> {
    if(request.url.includes(`${this.authenticationService.host}/user/login`)){
      return httpHandler.handle(request)
    } 

    if(request.url.includes(`${this.authenticationService.host}/user/register`)){
      return httpHandler.handle(request)
    } 

    if(request.url.includes(`${this.authenticationService.host}/user/resetpassword`)){
      return httpHandler.handle(request)
    }

    this.authenticationService.loadToken();
    const token = this.authenticationService.getToken();
    const httpReqest = request.clone({setHeaders:{Authorization: `Bearer ${token}`}}); 
  
    return httpHandler.handle(httpReqest)
  }
}
