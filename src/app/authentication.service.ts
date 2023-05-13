import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CredentialsUser } from './credentials-user';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  urlBase = "http://129.151.247.65:8080/"

  constructor(private http: HttpClient) { }

  public set_token(token: string): void {
    sessionStorage.setItem('token', token);
  }

  public get_token(): string {

    return sessionStorage.getItem('token') || '';
  }

  public enroll(user: CredentialsUser): Observable<any> {

    const headers = { 'content-type': 'application/json'}
    const body=JSON.stringify(user);

    const url =  this.urlBase + 'users';
    return this.http.post<any>(url, body ,{'headers':headers})
    
  }

  public signIn(user: CredentialsUser): Observable<any> {

    const headers = { 'content-type': 'application/json'}
    const body=JSON.stringify(user);

    const url = this.urlBase + 'login';
    return this.http.post<any>(url, body ,{headers, observe: 'response'})
    .pipe(
      map(response => {
        // Récupérer le header Authorization
        const authHeader = response.headers.get('Authorization');
        // Vérifier que le header est présent et contient un token
        if (authHeader) {
          const token = authHeader.split(' ')[1];

          console.log("token " + token);
          // Stocker le token dans le session storage
          sessionStorage.setItem('token', token);
        }
        // Retourner le corps de la réponse
        return response.body;
      })
    );
    }
}
