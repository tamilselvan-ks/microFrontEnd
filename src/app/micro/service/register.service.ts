import { HttpClient, } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment.development';
import { User } from '../modal';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  public addRegister = environment.apiUrlPostgres + '/micro/add';
  public getAllUser = environment.apiUrlPostgres + '/micro/all';
  public getUserWithAllDetails = environment.mongApiUrl +'/details/allUsers'
  getAllUserDetails : any[] = [];
  
  constructor(
    private http: HttpClient,
  ) { }



  /**
  *
  * @param AddUsers
  */
  addUsers(Users: string): Observable<any> {
    return this.http.post(this.addRegister, Users,{responseType: 'text' });
  }

  /**
   * @param getallUsers
   */
  geAllUsers(){
    return this.http.get<any[]>(this.getAllUser)
  }
  /**
   * @param getallUsers
   */
  geAllUsersWithDetails(){
    return this.http.get<User[]>(this.getUserWithAllDetails)
  }
}
