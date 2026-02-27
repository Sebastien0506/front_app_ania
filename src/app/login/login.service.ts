import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor() { }

  loginWithDiscord(): void {
    window.location.href = 'http://localhost:8000/auth/discord/login/';
  }
}
