import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpcliService {
  errorMessage: string = '';

  constructor(private http: HttpClient){ }
      
  getData(): Observable<object> {
    return this.http.get('assets/author-info.json').pipe(
    catchError(err => {  
        console.log(err); 
        this.errorMessage = err.message;
        return [];
    }));
  }
}
