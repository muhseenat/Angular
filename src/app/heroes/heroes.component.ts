import { Component, OnInit } from '@angular/core';
import { Hero } from 'src/hero';
import { HEROES } from 'src/mock-heroes';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  hero=HEROES;
  selectedHero?:Hero;
  onSelect(hero:Hero):void{
    this.selectedHero=hero;
  }
}
