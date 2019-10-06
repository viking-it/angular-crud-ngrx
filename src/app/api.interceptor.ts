import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
  HttpResponse
} from "@angular/common/http";
import { Observable, of } from "rxjs";

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!req.url.includes('localhost:3000/products')) {
      return next.handle(req);
    }
	
	const httpsReq = req.clone({
      url: req.url.replace("http://localhost:3000", "https://my-json-server.typicode.com/viking-it/angular-crud-ngrx")
    });

    return next.handle(httpsReq);

  }
}