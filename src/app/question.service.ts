import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Question } from './question';
import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {

  constructor(
    private http: HttpClient,
  ) { }

  private questionUrl = 'http://localhost:8080/api/questions';
  private resultUrl = 'http://localhost:8080/api/result';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  getQuestions(): Observable<Question[]> {
    return this.http.get<Question[]>(this.questionUrl).pipe(
      catchError(this.handleError<Question[]>('getQuestions', [])),
    );
  }

  getResult(answers: Map<string, number>): Observable<string> {
    let answersList = Array.from(answers.values());
    answersList = answersList.filter(answer => answer !== 0);
    return this.http.post<string>(this.resultUrl, answersList, this.httpOptions).pipe(
      catchError(this.handleError<string>('getResult')),
    );
  }

  private handleError<T>(operation: string = 'operation', result?: T): (error: any) => Observable<T> {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
