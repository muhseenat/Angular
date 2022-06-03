import { Component, OnInit } from '@angular/core';
import { Hero } from 'src/hero';
import { HeroService } from '../hero.service';
// import { MessageService } from '../message.service';
@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  
  hero:Hero[]=[]
  selectedHero?:Hero;

  constructor(private heroService:HeroService) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  // onSelect(hero:Hero):void{
  //   this.selectedHero=hero;
  //   this.messageService.add(`HerosCompponent:Selected hero id=${hero.id}`)
  // }

  getHeroes(): void {
  this.heroService.getHeroes().subscribe(hereos=>this.hero=hereos)
    
  }

  add(name:string):void{
   name=name.trim();
   if(!name){return;}
   this.heroService.addHero({name} as Hero)
   .subscribe(name=>{
     this.hero.push(name)
   });
  }

  //delete hero
    delete(name:Hero):void{
      this.hero=this.hero.filter(h=>h!==name);
      this.heroService.deleteHero(name.id).subscribe();
    }
}
