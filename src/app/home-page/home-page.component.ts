import { Component, OnInit } from '@angular/core';
import * as p5 from 'p5';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  my_x :number=0;

  constructor(

  ) {}

  ngOnInit() {

    new p5(p => {
      let x = 100;
      let y = 100;

      p.setup = () => {
        let canvas2 = p.createCanvas(p.windowWidth - 200, p.windowHeight - 200);
        // creating a reference to the div here positions it so you can put things above and below
        // where the sketch is displayed
        canvas2.parent('sketch');
      };


      p.draw = () => {
        p.background(0);
        p.fill(255);
        p.rect(x, y, 50, 50);

        this.my_x+=5;
      };
    });

  }
}
