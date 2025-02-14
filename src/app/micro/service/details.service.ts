import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DetailsService {
  public addDetails = environment.mongApiUrl +'/details/submit'
   public getAllUser = environment.apiUrlPostgres + '/micro/all'

  constructor(
    private http: HttpClient,
  ) { }



/**
   * @param addAllUsers
   */
  addUserDetails(Users: string): Observable<any> {
    return this.http.post(this.addDetails, Users,{responseType: 'text' });

  }
  /**
   * @param getallUsers
   */
  getAllUsers(){
    return this.http.get<any[]>(this.getAllUser)
  }
}
