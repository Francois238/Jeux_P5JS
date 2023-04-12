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

  constructor(private http: HttpClient, private authenticationService : AuthenticationService) { }

  public send_score_snake(score: number): Observable<Score> {

    const token = this.authenticationService.get_token();
    //ajouter le token dans le header  

    let scoreEnvoye : ScoreEnvoye={score : score};

    const headers = { 'content-type': 'application/json', 'Authorization': 'Bearer ' + token};
    const body=JSON.stringify(scoreEnvoye);
    const url = 'http://localhost:8080/snake';
    return this.http.patch<Score>(url, body ,{'headers':headers})
  }

  public get_score_snake(): Observable<Score[]> {
    const token = this.authenticationService.get_token();

    console.log("token " + token)

    const headers = {'Authorization': 'Bearer ' + token};

    const url = 'http://localhost:8080/snake/top';

    return this.http.get<Score[]>(url, {headers});

  }

}
