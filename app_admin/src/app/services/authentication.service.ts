import { Inject, Injectable } from '@angular/core';
import { BROWSER_STORAGE } from '../storage';
import { User } from '../models/users';
import { AuthResponse } from '../models/authresponse';
import { TripDataService } from '../services/trip-data.service';
import { Observable } from 'rxjs'; // Import Observable
import { tap } from 'rxjs/operators'; // Import tap

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  authResp: AuthResponse = new AuthResponse();

  constructor(
    @Inject(BROWSER_STORAGE) private storage: Storage,
    private tripDataService: TripDataService
  ) {}

  public getToken(): string {
    const token = this.storage.getItem('travlr-token');
    return token ? token : '';
  }

  public saveToken(token: string): void {
    this.storage.setItem('travlr-token', token);
  }

  public logout(): void {
    this.storage.removeItem('travlr-token');
  }

  public isLoggedIn(): boolean {
    const token = this.getToken();
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp > Date.now() / 1000;
    }
    return false;
  }

  public getCurrentUser(): User {
    const token = this.getToken();
    const { email, name } = JSON.parse(atob(token.split('.')[1]));
    return { email, name } as User;
  }

  public login(user: User, passwd: string): Observable<AuthResponse> {
    return this.tripDataService.login(user, passwd).pipe(
      tap((value: AuthResponse) => {
        this.authResp = value;
        this.saveToken(this.authResp.token);
      })
    );
  }

  public register(user: User, passwd: string): void {
    this.tripDataService.register(user, passwd).subscribe({
      next: (value: AuthResponse) => {
        this.authResp = value;
        this.saveToken(this.authResp.token);
      },
      error: (error) => {
        console.error('Register error:', error.message);
      },
    });
  }
}