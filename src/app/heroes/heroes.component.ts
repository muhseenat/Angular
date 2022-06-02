import { Component, OnInit } from '@angular/core';
import { Hero } from 'src/hero';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';
@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  
  hero:Hero[]=[]
  selectedHero?:Hero;

  constructor(private heroService:HeroService,
    private messageService:MessageService) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  onSelect(hero:Hero):void{
    this.selectedHero=hero;
    this.messageService.add(`HerosCompponent:Selected hero id=${hero.id}`)
  }

  getHeroes(): void {
  this.heroService.getHeroes().subscribe(hereos=>this.hero=hereos)
    
  }
}
