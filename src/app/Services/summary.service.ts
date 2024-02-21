import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { SummaryModel } from '../Models/summary.model';

@Injectable({
  providedIn: 'root'
})
export class SummaryService {

constructor(private http: HttpClient) { }

getSummary(): Observable<any> {
  return this.http.get(`${environment.url}/Data`);
}

updateSummary(updateSummaryPayload: any, id: string | number): Observable<any> {
  return this.http.put(`${environment.url}/Data/${id}`, updateSummaryPayload);
}
}
