import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  
  baseUri:string = '/api/article';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  // Create
  createArticle(title:string,description:string,image:File): Observable<any> {
    const formdata = new FormData()
    formdata.append('title',title)
    formdata.append('description',description)
    formdata.append('image',image)
    return Observable.create(observer => {
      this.http.post(`${this.baseUri}/create`, 
        formdata
      ).subscribe((data : any) => {
        observer.next();
      })
    });
  }

  // Get all articles
  getArticle() {
    return this.http.get(`${this.baseUri}/list`);
  }

  // Get article by id
  getArticleById(id): Observable<any> {
    let url = `${this.baseUri}/detail/${id}`;
    return this.http.get(url, {headers: this.headers}).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }

  // Update article
  updateArticle(id, data): Observable<any> {
    const formdata = new FormData()
    formdata.append('title',data['title'])
    formdata.append('description',data['description'])
    formdata.append('image',data['image'])
    let url = `${this.baseUri}/update/${id}`;
    return this.http.put(url, formdata).pipe(
      catchError(this.errorMgmt)
    )
  }

  // Delete article
  deleteArticle(id): Observable<any> {
    let url = `${this.baseUri}/remove/${id}`;
    return this.http.delete(url, { headers: this.headers }).pipe(
      catchError(this.errorMgmt)
    )
  }

  // Error handling 
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

}