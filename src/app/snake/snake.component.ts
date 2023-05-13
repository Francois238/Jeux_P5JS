import { Component, OnInit } from '@angular/core';
import * as p5 from 'p5';
import { GameService } from '../game.service';
import { Score } from '../score';
import { ScoreEnvoye } from '../score-envoye';


@Component({
  selector: 'app-snake',
  templateUrl: './snake.component.html',
  styleUrls: ['./snake.component.css']
})
export class SnakeComponent implements OnInit {

  info=" ";
  score=0;
  perdu=false;
  nb_envoie=0;

  score_joueurs :Score[] = [];

  my_score! : Score;

  allowScroll: boolean = true;;

  constructor(private gameService : GameService) {}

  ngOnInit() {

    this.get_score_snake() //retrouver la liste des scores

    this.get_my_score() //retrouver le rang du joueur

    document.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
        event.preventDefault();
        this.allowScroll = false;
        window.scrollTo(0, window.scrollY);
      }
    });
  
    document.addEventListener('mousemove', (event) => {
      this.allowScroll = (event.clientY > 100 && event.clientY < window.innerHeight - 100);
    });
        


    new p5(p => {
      let xs= 50; //coord serpent
      let ys = 50;

      let tour=0;

      let lxs; //Derniere coord serpent
      let lys;

      //let lxy; //Place derniere coord serpent

      let pmx=0; //coord pomme
      let pmy=0;

      let manger=0;

      let position = [[xs,ys]]; //Creation tableau coord serpent

      let jouer = true;

      let Monte = false;
      let Descend = false;
      let Gauche = false;
      let Droite = false;



      p.setup = () => {
        let canvas2 = p.createCanvas(400, 400);

        canvas2.parent('sketch');

        pmx = p.random(20,380); //On choisit coord pommes
        pmy = p.random(20,380);

      };


      p.draw = () => {
        if(jouer == true){ //boucle pour jouer

          p.background(220);

          p.fill('red');

          p.circle(pmx,pmy,10); //On dessine la pomme
        /***************************************************************/
        /*******Dessin serpent *****************************************/
          for(let i=0 ; i < position.length ;i++  ){ //On dessine le serpent

            if(i==position.length-1){ //On dessine en bleu la tete du serpent
              p.fill('blue');
              p.rect(position[i][0],position[i][1],16,16);
            }
            else{
              p.fill('black');
              p.rect(position[i][0],position[i][1],16,16);
            }
          }
           lxs = position[position.length -1][0]; //Attribution des dernieres coord du serpent
           lys = position[position.length -1][1];
        /********************************************************************/
        /***************     Gestion des collisions    * ********************/
          //Gestion des bords

          if( (lxs<0) || (lxs>384) || (lys<0) || (lys>384) ){
            jouer = false;
            console.log("hors jeu");
          }

          //Gestion collision du serpent sur lui-meme
          if( position.length >10){
          for(let i=0; i<position.length-2;i++){
            if((Gauche ==false) && (Droite ==true) && (Monte == false) && (Descend == false)){ // le serpent va à droite

                if( (  (position[i][0] -lxs)  <=16  ) && ( (position[i][0] -lxs)  >0  )  && ( ( (lys<= position[i][1]) && (lys+16 >=position[i][1]) ) || ( (lys <=position[i][1] +16) && (lys+16 >=position[i][1]) ) )    ){
                     jouer = false;

                     }

            }
            if((Gauche ==true) && (Droite ==false) && (Monte == false) && (Descend == false)){ //Le serpent va a gauche

                if( (  (lxs -position[i][0])  <=16  ) && ( (lxs-position[i][0])  >0  )  && ( ( (lys<= position[i][1]) && (lys+16 >=position[i][1]) ) || ( (lys <=position[i][1] +16) && (lys+16 >=position[i][1]) ) )    ){
                     jouer = false;

                     }

            }
            if((Gauche ==false) && (Droite ==false) && (Monte == false) && (Descend == true)){ //Le serpent descend

                if( (  (position[i][1] -lys)  <=16  ) && ( (position[i][1] -lys)  >0  )   && ( ( (lxs<= position[i][0]) && (lxs+16 >=position[i][0]) ) || ( (lxs <=position[i][0] +16) && (lxs+16 >=position[i][0]) ) )    ){
                     jouer = false;

                     }

            }
            if((Gauche ==false) && (Droite ==false) && (Monte == true) && (Descend == false)){ //Le serpent monte

                if( (  ( lys-position[i][1])  <=16  ) && ( (lys-position[i][1])  >0  )   && ( ( (lxs<= position[i][0]) && (lxs+16 >=position[i][0]) ) || ( (lxs <=position[i][0] +16) && (lxs+16 >=position[i][0]) ) )    ){
                     jouer = false;

                     }

            }
          }
          }
        /***********************************************************/

        /********Gestion clavier *****************/
          if( p.keyCode == p.UP_ARROW){ //on monte
            ys = ys - 1;
          Monte = true;
          Descend = false;
          Gauche = false;
          Droite = false;
          }
          if ( p.keyCode == p.DOWN_ARROW){ //On descend
            ys = ys +1;
          Monte = false;
          Descend = true;
          Gauche = false;
          Droite = false;
          }

            if( p.keyCode == p.RIGHT_ARROW){ //Droite
            xs = xs + 1;
          Monte = false;
          Descend = false;
          Gauche = false;
          Droite = true;
          }
          if ( p.keyCode == p.LEFT_ARROW){ //Gauche
            xs = xs - 1;
          Monte = false;
          Descend = false;
          Gauche = true;
          Droite = false;
          }

        /*******************************************/

        /**************Gestion pommes****************/

          if ( (lxs  > pmx -13)&& ( lxs +16 < pmx +13) && (lys > pmy -13)&& ( lys +16 < pmy +13) ){ //
            pmx = p.random(20,380); //On choisit coord pommes
            pmy = p.random(20,380);
            p.print("ok");
            manger=1;
            tour = 20;  //On bloque la suppression des 1eres coordonées du serpent pour l agrandir
            this.score+=5;

          }

          p.append(position, [xs,ys]); //On ajoute les coordonnées dans la liste

          if ((manger ==0) && (position.length>1) && (tour ==0) ){
             /*On supprime les 1eres coordonées du tableau pour donner impression avancer*/
            position.shift();
          }

          if (manger ==1){
            manger=0;

          }
          if (tour >0){
            tour = tour -1;
          }
        /****************************************/
        }//Fin du grand IF
        /*********Le joueur a perdu*********************/
        else{

          this.info="perdu";
          this.perdu =true;
          this.send_score()

        }

        };
    });


  }

  public get_my_score(){
    this.gameService.get_my_score_snake().subscribe({
      next: (data : Score) => {
        this.my_score= data;

      }
    })
  }

  public get_score_snake(){

    this.gameService.get_score_snake().subscribe({

      next: (data : Score[]) => {

        this.score_joueurs = data;
      },
      error(err){
        console.log(err);
      }
    })
  }


  public send_score(){

    if (this.nb_envoie == 0){
      this.nb_envoie=1;

      this.gameService.send_score_snake(this.score).subscribe(
        (data : Score) => {
          console.log(data);
          
          this.get_score_snake();
          this.get_my_score()
        }
        
      )
    }
  }
  
}



