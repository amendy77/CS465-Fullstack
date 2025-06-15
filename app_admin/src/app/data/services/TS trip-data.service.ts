import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";

import { Trip } from '../models/trip'; 

@Injectable({
  providedIn: 'root'
})

export class TripDataService {

  constructor(private http: HttpClient) {}
  url = 'http://localhost:3000/api/trips';
  
  getTrips() : Observable<Trip[]> {
    return this.http.get<Trip[]>(this.url);
  }

  addTrip(formData: Trip) : Observable<Trip> {
    return this.http.post<Trip>(this.url, formData);
  }

    // Get a single trip by code
    getTrip(tripCode: string): Observable<Trip> { // Changed parameter type to `string`
      return this.http.get<Trip>(`${this.url}/${tripCode}`); // Ensure backend returns a single trip
    }
  
    // Update an existing trip
    updateTrip(formData: Trip): Observable<Trip> {
      return this.http.put<Trip>(`${this.url}/${formData.code}`, formData);
    }
}