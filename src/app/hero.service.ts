import { Injectable } from '@angular/core';
import { Hero } from 'src/hero';
import { HEROES } from 'src/mock-heroes';
import { MessageService } from './message.service';
import { Observable,of } from 'rxjs';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { catchError,map,tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor( private http:HttpClient,
    private messageService:MessageService) { }

private heroesUrl = 'api/heroes';

    private log(message: string) {
      this.messageService.add(`HeroService: ${message}`);
    }
  getHeroes():Observable<Hero []>{
return this.http.get<Hero[]>(this.heroesUrl).pipe(tap(_=>this.log('fetched heroes')),
catchError(this.handleError<Hero[]>('getHeroes',[])))
    
  }

getHero(id:number):Observable<Hero>{
const url=`${this.heroesUrl}/${id}`;
return this.http.get<Hero>(url).pipe(
  tap(_=>this.log(`fetched hero id =${id}`)),
  catchError(this.handleError<Hero>(`getHeroid=${id}`))
)
}

//ERROR HANDLING
private handleError<T>(operation='operation',result?:T){
  return (error:any):Observable<T>=>{
    console.error(error);
    this.log(`${operation} failed:${error.message}`)
   return of(result as T);    
  }
}

}
