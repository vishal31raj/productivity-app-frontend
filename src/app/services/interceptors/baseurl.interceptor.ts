import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
} from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BaseUrlInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (req.url.startsWith('http')) {
      return next.handle(req);
    }
    
    const modifiedReq = req.clone({
      url: `${environment.BASE_URL}${req.url}`,
    });

    return next.handle(modifiedReq);
  }
}
