import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ChatDTO} from "../../modelos/ChatDTO";

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:8080/api/chats';

  getChat(id: number): Observable<ChatDTO> {
    return this.http.get<ChatDTO>(`${this.apiUrl}/${id}`)
  }
}
