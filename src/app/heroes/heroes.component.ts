import { Component, OnInit } from '@angular/core';
import { Hero } from 'src/hero';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.getHeroes();
  }

  hero:Hero[]=[]
  selectedHero?:Hero;
  onSelect(hero:Hero):void{
    this.selectedHero=hero;
  }

  getHeroes(): void {
    this.hero = this.heroService.getHeroes();
  }
}
