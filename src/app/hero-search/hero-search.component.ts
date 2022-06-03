import { Component, OnInit } from '@angular/core';
import { Observable,Subject
 } from 'rxjs';

 import { debounceTime,distinctUntilChanged,switchMap } from 'rxjs/operators';
 import { Hero } from 'src/app/hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})
export class HeroSearchComponent implements OnInit {

  heroes$!:Observable<Hero[]>;
  private searchTerms= new Subject<string>();


  constructor(private heroService:HeroService) { }

  //Push search term into observable
  search(term:string):void
{
  this.searchTerms.next(term);

}


  ngOnInit(): void {
    this.heroes$=this.searchTerms.pipe(

      debounceTime(300),//wait 300MS for each keystroke for considering term
      distinctUntilChanged(),//ignore new term if it is same as previous
      //switch to new observable each time the term changes

      switchMap((term:string)=>
      this.heroService.searchHero(term))
    )

  }

}
