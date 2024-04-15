import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  public gifList: Gif[] = [];
  private apiKey: string = '3IGUPgJHabH28emmmMUcePYCsK21unc3';
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs';
  private _tagsHistory: string[] = [];

  constructor(private http: HttpClient) { 
    this.loadFromLocalStorage();
  }

  public get tagsHistory ( ) {
    return [ ...this._tagsHistory ];
  }

  private saveToLocalStorage(): void {
    localStorage.setItem('history', JSON.stringify(this._tagsHistory));
  }

  private loadFromLocalStorage(): void {
    const history = localStorage.getItem('history');

    if (history) {
      this._tagsHistory = JSON.parse(history);
      this.searchTag(this._tagsHistory[0]);
    } 
  }

  public searchTag( tag: string ): void {
    if ( tag.length === 0 ) return;

    this.organizeHistory(tag);

    const params = new HttpParams()
    .set('api_key', this.apiKey)
    .set('limit', '10')
    .set('q', tag);

    this.http.get<SearchResponse>(`${this.serviceUrl}/search`, { params })
    .subscribe( (response) => {
      this.gifList = response.data;
    });
  }

  public organizeHistory(tag: string): void {
    tag = tag.trim().toLowerCase();

    if(this.tagsHistory.includes(tag)) {
      this._tagsHistory = this._tagsHistory.filter( oldTag => oldTag !== tag );
    }

    this._tagsHistory.unshift(tag);
    this._tagsHistory = this._tagsHistory.splice(0, 10);
    this.saveToLocalStorage();
  }

}
