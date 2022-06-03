import { Component, OnInit } from '@angular/core';
import { Hero } from 'src/app/hero';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HeroService } from '../hero.service';
@Component({
  selector: 'app-hero-details',
  templateUrl: './hero-details.component.html',
  styleUrls: ['./hero-details.component.css']
})
export class HeroDetailsComponent implements OnInit {

  hero: Hero | undefined;
  constructor(
    private route:ActivatedRoute,
    private location:Location,
    private heroService:HeroService

  ) { }

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }

goBack():void{
  this.location.back();
}


save():void{
  if(this.hero){
    this.heroService.updateHero(this.hero)
    .subscribe(()=>this.goBack());
  }
}
// save(): void {
//   if (this.hero) {
//     this.heroService.updateHero(this.hero)
//       .subscribe(() => this.goBack());
//   }
// }

}
