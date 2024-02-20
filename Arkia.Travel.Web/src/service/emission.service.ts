// emission.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmissionService {

  
  private apiUrl = 'https://localhost:7242/computeFlightEmissions'; // Replace with your API URL

  //private apiUrl = 'https://localhost:5001/api/emission/computeFlightEmissions'; // Replace with your API URL

  constructor(private http: HttpClient) { }

  computeFlightEmissions(request: any): Observable<string> {
    debugger
    const headers = new HttpHeaders({
      'Content-Type': 'application/json', // Adjust the content type if needed
    });
    return this.http.post<any>(this.apiUrl, request,{headers, responseType: 'text' as any});
  }
}
