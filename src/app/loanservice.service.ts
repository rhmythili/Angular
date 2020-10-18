import { Injectable } from '@angular/core';
import { Observable, throwError} from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { catchError,map } from 'rxjs/operators';


@Injectable(
  {
  providedIn: 'root'
}
)
export class LoanserviceService {
 
  constructor(private httpClient : HttpClient) { }
  postUsers(users):Observable<any>{
    const headers= new HttpHeaders()
   .set('content-type', 'application/json')
    const body = JSON.stringify(users)
    let url="http://localhost:9999/loanDetails/postUsers";
   return this.httpClient.post(url, body, {'headers': headers}).pipe(
     map(res => res.toString()));
  //  .pipe(
  //    catchError(catchError(this.handleError))

  }

  getUsers():Observable<any>{
    let url="http://localhost:9999/loanDetails/users";
    return this.httpClient.get<any>(url)
    // .pipe(
    //   map(res => res.toString()));
  }

  /** Error Handling method */

  // handleError(error: HttpErrorResponse) {
  //   // if (error.error instanceof ErrorEvent) {
  //   //   // A client-side or network error occurred. Handle it accordingly.
  //   //   console.error('An error occurred:', error.error.message);
  //   // } else {
  //   //   // The backend returned an unsuccessful response code.
  //   //   // The response body may contain clues as to what went wrong,
  //   //   console.error(
  //   //     `Backend returned code ${error.status}, ` +
  //   //     `body was: ${error.message}`);
  //   // }
  //   // return an observable with a user-facing error message
  //   return throwError(
  //     'Something bad happened; please try again later.'
  //     );
  //};


}
