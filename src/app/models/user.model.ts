export class User {
  constructor(
    public userId: number,
    public userName: string,
    public userIsActive: boolean,
    public userRoleId: number,
    public profileImgUrl: string,
    public enterpriseId: string,
    public enterpriseName: string,
    public currentPlan: any,
    private _token: string,
    private _tokenExpirationDate: Date
  ) {}

  get token() {
    if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
      return null;
    }
    return this._token;
  }
}
