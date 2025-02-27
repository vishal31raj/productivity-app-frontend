import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { API_ROUTES } from '../constants/api-routes';
import { ToastService } from '../services/toast.service';
import { User } from '../models/user.model';
const BASE_URL = environment.BASE_URL;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new BehaviorSubject<User | null>(null);
  private _tokenExpirationTimer: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private _toastService: ToastService
  ) {
    this.autoLogin();
  }

  login(reqBody: any) {
    return this.http.post(BASE_URL + API_ROUTES.UserLogin, reqBody).pipe(
      tap((res: any) => {
        this.handleAuthentication(
          res.user.id,
          res.user.name,
          res.user.isActive,
          res.user.userRoleId,
          res.user.profileImgUrl,
          res.enterpriseDetails._id,
          res.enterpriseDetails.name,
          res.enterpriseDetails.planId,
          res.token,
          res.tokenExpirationDate
        );
      })
    );
  }

  autoLogin() {
    const userData = JSON.parse(localStorage.getItem('userData')!);
    if (!userData) {
      return;
    }
    const loadedUser = new User(
      userData.userId,
      userData.userName,
      userData.userIsActive,
      userData.userRoleId,
      userData.profileImgUrl,
      userData.enterpriseId,
      userData.enterpriseName,
      userData.enterprisePlanId,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );
    if (loadedUser.token) {
      this.user.next(loadedUser);

      const expirationTime =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();
      this.autoLogout(expirationTime);
    }
  }

  logout() {
    this.user.next(null);
    this._toastService.showSuccessToast('Logged out successfully!');
    this.router.navigate(['/login']);
    localStorage.removeItem('userData');

    if (this._tokenExpirationTimer) {
      clearTimeout(this._tokenExpirationTimer);
    }
    this._tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number) {
    this._tokenExpirationTimer = setTimeout(() => {
      this.logout();
      this._toastService.showErrorToast('Session Expired! Please login again.');
    }, expirationDuration);
  }

  private handleAuthentication(
    userId: number,
    userName: string,
    userIsActive: boolean,
    userRoleId: number,
    profileImgUrl: string,
    enterpriseId: string,
    enterpriseName: string,
    enterprisePlanId: string,
    token: string,
    tokenExpirationDate: Date
  ) {
    const loggedInUser = new User(
      userId,
      userName,
      userIsActive,
      userRoleId,
      profileImgUrl
        ? BASE_URL + '/' + profileImgUrl
        : 'https://ionicframework.com/docs/img/demos/avatar.svg',
      enterpriseId,
      enterpriseName,
      enterprisePlanId,
      token,
      tokenExpirationDate
    );
    this.user.next(loggedInUser);
    localStorage.setItem('userData', JSON.stringify(loggedInUser));

    const expirationDuration =
      new Date(tokenExpirationDate).getTime() - new Date().getTime();
    this.autoLogout(expirationDuration);
  }
}
