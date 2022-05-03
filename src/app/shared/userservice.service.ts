import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {

  dbUrl=environment.apiUrl
  
  constructor(private http:HttpClient) { }

  postUser(data:any){
    return this.http.post<any>(this.dbUrl+"users", data)
  }

  getUser(){
    return this.http.get<any>(this.dbUrl+"users")
  }
  updateUser(data:any, id: number){
    return this.http.put<any>(this.dbUrl+`users/`+`${id}`, data)
  }
  deleteUser(id : number){
return this.http.delete<any>(this.dbUrl+`users/`+`${id}`)
  }
  // getCurrentData(id: number){
  //   return this.http.get<any>(this.dbUrl+`users/`+`${id}`)
  // }
}
