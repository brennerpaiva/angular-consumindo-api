import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Music } from 'src/model/music.model';
import { MusicService } from 'src/service/music.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'tutoriais';
  musicas$ = new Observable<Music[]>();

  // form
  id = '';
  musica = 'eu sou uma musica';
  autor = '';

  constructor(private musicService: MusicService){
    this.obterMusicasCadastradas();
  }

  obterMusicasCadastradas(){
    // this.musicService.obterMusicas()
    //   .subscribe(musicas => this.musicas = musicas)

    this.musicas$ = this.musicService.obterMusicas();
  }

  buttonClick(){
    if (!this.musica || !this.autor)
      return;

    if (this.id) {
      this.atualizar();
      return;
    }

    this.musicService.cadastrarMusica({ author: this.autor, text: this.musica })
      .subscribe(_ => this.obterMusicasCadastradas())
  }

  atualizar(){
    this.musicService.editarMusica({
      id: parseInt(this.id), author: this.autor, text: this.musica })
    .subscribe(_ => this.obterMusicasCadastradas());
  }

  preencherCampos(musica: Music){
    this.id = musica.id!.toString();
    this.musica = musica.text;
    this.autor = musica.author;
  }

  remover(id: number){
    this.musicService.remover(id)
      .subscribe(_ => this.obterMusicasCadastradas());
  }
}
