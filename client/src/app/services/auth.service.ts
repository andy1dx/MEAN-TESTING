import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class AuthService {

  domain = "http://localhost:3000";

  constructor(
  	private http: Http
  ) { }

  //post username
  registerUser(user){
  	return this.http.post(this.domain + '/authentication/register', user).map(res => res.json());
  }

  // check username
   checkUsername(username){
  	return this.http.get(this.domain + '/authentication/checkusername/' +  username).map(res => res.json());
  }
  //check email
   checkEmail(email){
  	return this.http.get(this.domain + '/authentication/checkemail/' +  email).map(res => res.json());
  }

}
