import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:8000/start-task/';

  constructor( private http: HttpClient ){ }

  startTask( userId: number): Observable <any> {
    return this.http.post<any>( this.apiUrl, { id: userId })
  }
}