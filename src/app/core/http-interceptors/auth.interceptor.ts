import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { EMPTY, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators'
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(
    private authService: AuthService,
    ) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {

    let req: HttpRequest<any> = request;
    const token = this.authService.getToken();

    if(this.authService.isUserAuthenticated()) {

        req = request.clone({
            headers: request.headers.set('Authorization', `Bearer ${token}`)
        });

        return next.handle(req)
        .pipe(
            catchError(this.handleError)
        );

    } else if(!req.url.endsWith('/login') && !req.url.endsWith('/register')) {

        return EMPTY;

    } else {

        return next.handle(req)
        .pipe(
            catchError(this.handleError)
        );
    }
}

    private handleError(erro: HttpErrorResponse) {
        if(erro.error instanceof ErrorEvent) {
            // Erro client-side
            console.error('Ocorreu um erro:', erro.error);
        } else {
            // Erro do backend
            if(erro.error == null){
                console.error(
                    `Código do erro: ${erro.status}\n` +
                    `Erro: ${JSON.stringify(erro.error)}`
                );
            } else {
                console.error(
                    `Código do erro: ${erro.status}\n` +
                    `Erro: ${JSON.stringify(erro.error.message)}`
                );
            }
        }
        // Erro genérico
        return throwError(erro);
    }
}
