import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  
  private _historial: string[] = [];
  private apiKey: string = 'n0s4EMqr56asQ0p5MzZrrBfUCDJhLM4x';
  private servicioUrl: string = "https://api.giphy.com/v1/gifs";
  public resultados: Gif[] = [];

  get historial(){
    return [...this._historial];
  }

  constructor(private http: HttpClient){
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];
    // if(localStorage.getItem('historial')){
    //   this._historial = JSON.parse(localStorage.getItem('historial')!);
    // }
  }

  buscarGifs( query: string){
    query = query.trim();
    let historialLow = this._historial.map((value) => ( value.toLowerCase()));
    if(!historialLow.includes(query.toLowerCase()) && query.length !== 0){
      this._historial.unshift(query);
      this._historial = this._historial.splice(0,10);
    }
    
    const params = new HttpParams()
      .set('api_key',this.apiKey)
      .set('limit','10')
      .set('q',query)

    localStorage.setItem('historial',JSON.stringify(this._historial));
    this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search`,{ params})
    .subscribe( (resp) => {
      this.resultados = resp.data;
      localStorage.setItem('resultados',JSON.stringify(this.resultados));
    })
  }

  // buscarGifs( query: string){
  //   query = query.trim();
  //   let historialLow = this._historial.map((value) => ( value.toLowerCase()));
  //   if(historialLow.includes(query.toLowerCase()) || query.length < 1){
  //     return;
  //   }
  //   console.log(historialLow);
  //   this._historial.unshift(query);
  //   this._historial = this._historial.splice(0,10);

  //   fetch("https://api.giphy.com/v1/gifs/search?api_key=n0s4EMqr56asQ0p5MzZrrBfUCDJhLM4x&q=Dragon ball z&limit=10")
  //   .then(resp => {
  //       resp.json().then(data => {
  //         console.log(data);
  //       })
  //   })

  // }

  // async buscarGifs( query: string){
  //   query = query.trim();
  //   let historialLow = this._historial.map((value) => ( value.toLowerCase()));
  //   if(historialLow.includes(query.toLowerCase()) || query.length < 1){
  //     return;
  //   }
  //   this._historial.unshift(query);
  //   this._historial = this._historial.splice(0,10);

  //   const resp = await fetch("https://api.giphy.com/v1/gifs/search?api_key=n0s4EMqr56asQ0p5MzZrrBfUCDJhLM4x&q=Dragon ball z&limit=10");
  //   const data = await resp.json();
  //   console.log(data);

  // }
}
