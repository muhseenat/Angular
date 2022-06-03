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

httpOptions={
  headers:new HttpHeaders({'Content-Type':'application/json'})
}
// updateHero(hero:Hero):Observable<any>{
//   return this.http.put(this.heroesUrl,hero,this.httpOptions).pipe(
//     (tap_ => this.log(`updated hero id=${hero.id}`)),
//     catchError(this.handleError<any>('updatedHero'))
//   )

// }
//Add hero 
addHero(hero:Hero):Observable<Hero>{
  return this.http.post<Hero>(this.heroesUrl,hero,this.httpOptions)
  .pipe( tap((newHero:Hero)=>this.log(`added Hero w/id=${newHero.id}`)),
  catchError(this.handleError<Hero>('addHero')))
}

//Delete Hero
deleteHero(id:number):Observable<Hero>{
  const url = `${this.heroesUrl}/${id}`;
  return this.http.delete<Hero>(url,this.httpOptions)
  .pipe(
    tap(_=>this.log(`deleted hero id=${id}`)),
    catchError(this.handleError<Hero>('deleteHero'))
  );
}

}
