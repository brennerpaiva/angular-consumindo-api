import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Music } from "src/model/music.model";

@Injectable({
  providedIn: 'root'
})
export class MusicService {

  private url = `${environment.apiUrl}/musics`;

  constructor(private httpClient: HttpClient){
  }

  obterMusicas(){
    return this.httpClient.get<Music[]>(this.url);
  }

  cadastrarMusica() {
    return this.httpClient.get<Music[]>(this.url)
  }
}
