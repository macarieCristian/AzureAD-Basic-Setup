import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

export interface DummyDto {
  id: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) {
  }

  getAuthorizedResource(): Observable<DummyDto> {
    return this.http.get<DummyDto>(`${environment.baseUrl}/dummy/authorized`);
  }

  getPublicResource(): Observable<DummyDto> {
    return this.http.get<DummyDto>(`${environment.baseUrl}/dummy/public`);
  }
}
