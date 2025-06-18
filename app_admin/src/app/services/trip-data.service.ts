import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Trip } from '../models/trip';
import { AuthResponse } from '../models/authresponse';
import { User } from '../models/users';

@Injectable({
  providedIn: 'root',
})
export class TripDataService {
  private apiUrl = 'http://localhost:3000/api'; // Adjusted base API URL for consistency

  constructor(private http: HttpClient) {}

  // Method to retrieve all trips
  getTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(`${this.apiUrl}/trips`);
  }

  // Method to add a new trip
  addTrip(formData: Trip): Observable<Trip> {
    return this.http.post<Trip>(`${this.apiUrl}/trips`, formData);
  }

  // Method to retrieve a single trip by tripCode
  getTrip(tripCode: string): Observable<Trip> {
    return this.http.get<Trip>(`${this.apiUrl}/trips/${tripCode}`);
  }

  // Method to update an existing trip
  updateTrip(formData: Trip): Observable<Trip> {
    return this.http.put<Trip>(`${this.apiUrl}/trips/${formData.code}`, formData);
  }

  // Method to handle user login
  login(user: User, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, {
      email: user.email,
      password: password, // Sending required fields to the backend
    });
  }

  // Method to handle user registration
  register(user: User, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, {
      email: user.email,
      name: user.name,
      password: password, // Sending required fields to the backend
    });
  }
}