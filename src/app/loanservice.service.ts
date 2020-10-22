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
    let url="http://localhost:9999/loanDetails/users";
   return this.httpClient.post(url, body, {'headers': headers}).pipe(
     map(res => res.toString()));

  }

  getUsers():Observable<any>{
    let url="http://localhost:9999/loanDetails/users";
    return this.httpClient.get<any>(url)
  }

}
