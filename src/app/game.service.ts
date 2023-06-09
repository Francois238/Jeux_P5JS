import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { Score } from './score';
import { ScoreEnvoye } from './score-envoye';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  urlBase = "http://129.151.247.65:8080/"

  constructor(private http: HttpClient, private authenticationService : AuthenticationService) { }

  public send_score_snake(score: number): Observable<Score> {

    const token = this.authenticationService.get_token();
    //ajouter le token dans le header  

    let scoreEnvoye : ScoreEnvoye={score : score};

    const headers = { 'content-type': 'application/json', 'Authorization': 'Bearer ' + token};
    const body=JSON.stringify(scoreEnvoye);
    const url = this.urlBase + 'snake';
    return this.http.patch<Score>(url, body ,{'headers':headers})
  }

  public get_score_snake(): Observable<Score[]> {
    const token = this.authenticationService.get_token();

    console.log("token " + token)

    const headers = {'Authorization': 'Bearer ' + token};

    const url = this.urlBase + 'snake/top';

    return this.http.get<Score[]>(url, {headers});

  }


  public get_my_score_snake(): Observable<Score> {
    const token = this.authenticationService.get_token();

    console.log("token " + token)

    const headers = {'Authorization': 'Bearer ' + token};

    const url = this.urlBase + 'snake/me';

    return this.http.get<Score>(url, {headers});

  }

}
